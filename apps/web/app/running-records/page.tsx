'use client';

import { ProtectedPageLayout, StatusMessage } from '@components';
import { useAuth } from '@contexts';
import {
  createRunningRecord,
  deleteRunningRecord,
  formatDuration,
  formatPace,
  getApiErrorMessage,
  getMyRunningRecords,
  RunningRecord,
  updateRunningRecord,
} from '@utils';
import { FormEvent, useEffect, useState } from 'react';

type RecordFormState = {
  runDate: string;
  distanceKm: string;
  durationHours: string;
  durationMinutes: string;
  durationSeconds: string;
  memo: string;
};

type RecordFormErrors = Partial<Record<keyof RecordFormState | 'duration', string>>;

const getToday = () => new Date().toISOString().split('T')[0];

const getEmptyForm = (): RecordFormState => ({
  runDate: getToday(),
  distanceKm: '',
  durationHours: '',
  durationMinutes: '',
  durationSeconds: '',
  memo: '',
});

const getTrainingPrefillForm = (currentForm: RecordFormState, params: URLSearchParams): RecordFormState => {
  const runDate = params.get('runDate');
  const distanceKm = params.get('distanceKm');
  const memo = params.get('memo');

  return {
    ...currentForm,
    ...(runDate ? { runDate } : {}),
    ...(distanceKm ? { distanceKm } : {}),
    ...(memo ? { memo: `훈련 계획: ${memo}` } : {}),
  };
};

const getDurationSeconds = (form: RecordFormState) => {
  return (
    Number(form.durationHours || 0) * 3600 +
    Number(form.durationMinutes || 0) * 60 +
    Number(form.durationSeconds || 0)
  );
};

const getFormFromRecord = (record: RunningRecord): RecordFormState => {
  const hours = Math.floor(record.durationSeconds / 3600);
  const minutes = Math.floor((record.durationSeconds % 3600) / 60);
  const seconds = record.durationSeconds % 60;

  return {
    runDate: record.runDate.split('T')[0],
    distanceKm: String(record.distanceKm),
    durationHours: hours ? String(hours) : '',
    durationMinutes: minutes ? String(minutes) : '',
    durationSeconds: seconds ? String(seconds) : '',
    memo: record.memo ?? '',
  };
};

const validateRecordForm = (form: RecordFormState) => {
  const errors: RecordFormErrors = {};
  const distanceKm = Number(form.distanceKm);
  const durationHours = Number(form.durationHours || 0);
  const durationMinutes = Number(form.durationMinutes || 0);
  const durationSeconds = Number(form.durationSeconds || 0);
  const totalDurationSeconds = getDurationSeconds(form);

  if (!form.runDate) {
    errors.runDate = '날짜를 선택해주세요.';
  }

  if (!form.distanceKm || Number.isNaN(distanceKm) || distanceKm <= 0) {
    errors.distanceKm = '거리는 0보다 큰 숫자로 입력해주세요.';
  }

  if (
    Number.isNaN(durationHours) ||
    Number.isNaN(durationMinutes) ||
    Number.isNaN(durationSeconds) ||
    durationHours < 0 ||
    durationMinutes < 0 ||
    durationMinutes > 59 ||
    durationSeconds < 0 ||
    durationSeconds > 59
  ) {
    errors.duration = '시간은 0 이상, 분과 초는 0부터 59 사이로 입력해주세요.';
  } else if (totalDurationSeconds <= 0) {
    errors.duration = '러닝 시간은 1초 이상 입력해주세요.';
  }

  return errors;
};

const hasErrors = (errors: RecordFormErrors) => Object.keys(errors).length > 0;

export default function RunningRecordsPage() {
  const { user } = useAuth();
  const [records, setRecords] = useState<RunningRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [listErrorMessage, setListErrorMessage] = useState('');

  const [createForm, setCreateForm] = useState<RecordFormState>(() => getEmptyForm());
  const [createErrors, setCreateErrors] = useState<RecordFormErrors>({});
  const [createErrorMessage, setCreateErrorMessage] = useState('');
  const [trainingPrefillMessage, setTrainingPrefillMessage] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const [editingRecordId, setEditingRecordId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<RecordFormState>(() => getEmptyForm());
  const [editErrors, setEditErrors] = useState<RecordFormErrors>({});
  const [editErrorMessage, setEditErrorMessage] = useState('');
  const [updatingRecordId, setUpdatingRecordId] = useState<number | null>(null);
  const [deletingRecordId, setDeletingRecordId] = useState<number | null>(null);

  const fetchRecords = async () => {
    try {
      setListErrorMessage('');
      const nextRecords = await getMyRunningRecords();

      setRecords(nextRecords);
    } catch (error) {
      setListErrorMessage(getApiErrorMessage(error, '러닝 기록을 불러오지 못했습니다.'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRecords();
    }
  }, [user]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get('source') !== 'training') {
      return;
    }

    setCreateForm((currentForm) => getTrainingPrefillForm(currentForm, params));
    setTrainingPrefillMessage('오늘 훈련 내용을 기준으로 기록 입력값을 미리 채웠습니다.');
  }, []);

  const getPayload = (form: RecordFormState) => ({
    runDate: form.runDate,
    distanceKm: Number(form.distanceKm),
    durationSeconds: getDurationSeconds(form),
    memo: form.memo.trim() || undefined,
  });

  const updateCreateForm = (field: keyof RecordFormState, value: string) => {
    setCreateForm((currentForm) => ({ ...currentForm, [field]: value }));
    setCreateErrors((currentErrors) => ({ ...currentErrors, [field]: undefined, duration: undefined }));
    setCreateErrorMessage('');
  };

  const updateEditForm = (field: keyof RecordFormState, value: string) => {
    setEditForm((currentForm) => ({ ...currentForm, [field]: value }));
    setEditErrors((currentErrors) => ({ ...currentErrors, [field]: undefined, duration: undefined }));
    setEditErrorMessage('');
  };

  const handleCreateRecord = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validateRecordForm(createForm);
    setCreateErrors(errors);
    setCreateErrorMessage('');

    if (hasErrors(errors)) {
      return;
    }

    try {
      setIsCreating(true);
      await createRunningRecord(getPayload(createForm));
      setCreateForm(getEmptyForm());
      setTrainingPrefillMessage('');
      window.history.replaceState(null, '', '/running-records');
      await fetchRecords();
    } catch (error) {
      setCreateErrorMessage(getApiErrorMessage(error, '러닝 기록을 저장하지 못했습니다.'));
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteRecord = async (id: number) => {
    if (!window.confirm('삭제하시겠습니까?')) {
      return;
    }

    try {
      setDeletingRecordId(id);
      await deleteRunningRecord(id);
      await fetchRecords();
    } catch (error) {
      setListErrorMessage(getApiErrorMessage(error, '러닝 기록을 삭제하지 못했습니다.'));
    } finally {
      setDeletingRecordId(null);
    }
  };

  const handleStartEdit = (record: RunningRecord) => {
    setEditingRecordId(record.id);
    setEditForm(getFormFromRecord(record));
    setEditErrors({});
    setEditErrorMessage('');
  };

  const handleUpdateRecord = async (id: number) => {
    const errors = validateRecordForm(editForm);
    setEditErrors(errors);
    setEditErrorMessage('');

    if (hasErrors(errors)) {
      return;
    }

    try {
      setUpdatingRecordId(id);
      await updateRunningRecord(id, getPayload(editForm));
      await fetchRecords();
      handleCancelEdit();
    } catch (error) {
      setEditErrorMessage(getApiErrorMessage(error, '러닝 기록을 수정하지 못했습니다.'));
    } finally {
      setUpdatingRecordId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingRecordId(null);
    setEditForm(getEmptyForm());
    setEditErrors({});
    setEditErrorMessage('');
  };

  return (
    <ProtectedPageLayout
      title="러닝 기록"
      description="나의 러닝 데이터를 기록하고 관리하세요."
    >
          {trainingPrefillMessage && (
            <div className="mb-6">
              <StatusMessage message={trainingPrefillMessage} tone="info" />
            </div>
          )}

          <form
            onSubmit={handleCreateRecord}
            className="mb-8 rounded-lg border border-slate-800 bg-slate-900 p-6"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-bold text-white">러닝 기록 추가</h2>
              {isCreating && <p className="text-sm text-blue-300">저장 중...</p>}
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-slate-300">달린 날짜</label>
                <input
                  type="date"
                  value={createForm.runDate}
                  onChange={(event) => updateCreateForm('runDate', event.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isCreating}
                />
                {createErrors.runDate && <p className="mt-2 text-sm text-red-300">{createErrors.runDate}</p>}
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">거리 (km)</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={createForm.distanceKm}
                  onChange={(event) => updateCreateForm('distanceKm', event.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                  placeholder="5.2"
                  disabled={isCreating}
                />
                {createErrors.distanceKm && (
                  <p className="mt-2 text-sm text-red-300">{createErrors.distanceKm}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">시간</label>

                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    min="0"
                    value={createForm.durationHours}
                    onChange={(event) => updateCreateForm('durationHours', event.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                    placeholder="시"
                    disabled={isCreating}
                  />

                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={createForm.durationMinutes}
                    onChange={(event) => updateCreateForm('durationMinutes', event.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                    placeholder="분"
                    disabled={isCreating}
                  />

                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={createForm.durationSeconds}
                    onChange={(event) => updateCreateForm('durationSeconds', event.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                    placeholder="초"
                    disabled={isCreating}
                  />
                </div>
                {createErrors.duration && <p className="mt-2 text-sm text-red-300">{createErrors.duration}</p>}
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">메모</label>
                <input
                  type="text"
                  value={createForm.memo}
                  onChange={(event) => updateCreateForm('memo', event.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                  placeholder="가볍게 조깅 완료"
                  disabled={isCreating}
                />
              </div>
            </div>

            {createErrorMessage && (
              <div className="mt-5">
                <StatusMessage message={createErrorMessage} />
              </div>
            )}

            <button
              type="submit"
              className="mt-5 rounded-lg bg-blue-500 px-5 py-3 font-semibold text-white hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-300"
              disabled={isCreating}
            >
              {isCreating ? '저장 중...' : '러닝 기록 저장'}
            </button>
          </form>

          <div className="space-y-4">
            {listErrorMessage && <StatusMessage message={listErrorMessage} />}

            {isLoading ? (
              <div className="rounded-lg border border-slate-800 bg-slate-900 p-6 text-slate-300">
                러닝 기록을 불러오는 중입니다...
              </div>
            ) : records.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-700 bg-slate-900 p-10 text-center">
                <p className="text-lg font-semibold text-white">아직 러닝 기록이 없습니다</p>

                <p className="mt-2 text-sm text-slate-400">첫 러닝 기록을 추가해보세요.</p>
              </div>
            ) : (
              records.map((record) =>
                editingRecordId === record.id ? (
                  <div key={record.id} className="rounded-lg border border-blue-500/40 bg-slate-900 p-5">
                    <div className="space-y-4">
                      <div className="grid gap-3 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm text-slate-300">달린 날짜</label>
                          <input
                            type="date"
                            value={editForm.runDate}
                            onChange={(event) => updateEditForm('runDate', event.target.value)}
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                            disabled={updatingRecordId === record.id}
                          />
                          {editErrors.runDate && <p className="mt-2 text-sm text-red-300">{editErrors.runDate}</p>}
                        </div>

                        <div>
                          <label className="mb-2 block text-sm text-slate-300">거리 (km)</label>
                          <input
                            type="number"
                            min="0"
                            step="0.1"
                            value={editForm.distanceKm}
                            onChange={(event) => updateEditForm('distanceKm', event.target.value)}
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                            placeholder="거리"
                            disabled={updatingRecordId === record.id}
                          />
                          {editErrors.distanceKm && (
                            <p className="mt-2 text-sm text-red-300">{editErrors.distanceKm}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm text-slate-300">시간</label>
                        <div className="grid grid-cols-3 gap-2">
                          <input
                            type="number"
                            min="0"
                            value={editForm.durationHours}
                            onChange={(event) => updateEditForm('durationHours', event.target.value)}
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                            placeholder="시"
                            disabled={updatingRecordId === record.id}
                          />

                          <input
                            type="number"
                            min="0"
                            max="59"
                            value={editForm.durationMinutes}
                            onChange={(event) => updateEditForm('durationMinutes', event.target.value)}
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                            placeholder="분"
                            disabled={updatingRecordId === record.id}
                          />

                          <input
                            type="number"
                            min="0"
                            max="59"
                            value={editForm.durationSeconds}
                            onChange={(event) => updateEditForm('durationSeconds', event.target.value)}
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                            placeholder="초"
                            disabled={updatingRecordId === record.id}
                          />
                        </div>
                        {editErrors.duration && <p className="mt-2 text-sm text-red-300">{editErrors.duration}</p>}
                      </div>

                      <div>
                        <label className="mb-2 block text-sm text-slate-300">메모</label>
                        <textarea
                          value={editForm.memo}
                          onChange={(event) => updateEditForm('memo', event.target.value)}
                          className="min-h-24 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                          placeholder="메모"
                          disabled={updatingRecordId === record.id}
                        />
                      </div>

                      {editErrorMessage && <StatusMessage message={editErrorMessage} />}

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleUpdateRecord(record.id)}
                          className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-300"
                          disabled={updatingRecordId === record.id}
                        >
                          {updatingRecordId === record.id ? '저장 중...' : '저장'}
                        </button>

                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                          disabled={updatingRecordId === record.id}
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    key={record.id}
                    className="rounded-lg border border-slate-800 bg-slate-900 p-5 shadow-lg transition hover:border-blue-500"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm text-slate-400">{record.runDate.split('T')[0]}</p>

                        <p className="mt-1 text-slate-300">{formatDuration(record.durationSeconds)}</p>

                        <p className="mt-1 text-sm text-blue-400">Pace {formatPace(record.paceSecPerKm)}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(record)}
                          className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                          disabled={deletingRecordId === record.id}
                        >
                          수정
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteRecord(record.id)}
                          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-300"
                          disabled={deletingRecordId === record.id}
                        >
                          {deletingRecordId === record.id ? '삭제 중...' : '삭제'}
                        </button>
                      </div>
                    </div>

                    {record.memo && (
                      <div className="mt-4 rounded-lg bg-slate-950 p-4">
                        <p className="text-sm text-slate-300">{record.memo}</p>
                      </div>
                    )}
                  </div>
                ),
              )
            )}
          </div>
    </ProtectedPageLayout>
  );
}
