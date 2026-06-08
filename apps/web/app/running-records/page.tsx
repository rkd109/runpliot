'use client';

import { ProtectedRoute } from '@components';
import { api, formatDuration, formatPace } from '@utils';
import { SubmitEvent, useEffect, useState } from 'react';



type RunningRecord = {
    runDate: string;
    id: number;
    distanceKm: number;
    durationSeconds: number;
    paceSecPerKm: number;
    createdAt: string;
    memo: string;
};

export default function RunningRecordsPage() {
    const [records, setRecords] = useState<RunningRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const today = new Date().toISOString().split('T')[0];

    const [runDate, setRunDate] = useState(today);
    const [distanceKm, setDistanceKm] = useState('');
    const [durationHours, setDurationHours] = useState('');
    const [durationMinutes, setDurationMinutes] = useState('');
    const [durationSeconds, setDurationSeconds] = useState('');
    const [memo, setMemo] = useState('');

    const fetchRecords = async () => {
        try {
            const response = await api.get('/running-records/me');

            setRecords(response.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    const handleCreateRecord = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const totalDurationSeconds =
            Number(durationHours || 0) * 3600 +
            Number(durationMinutes || 0) * 60 +
            Number(durationSeconds || 0);

        await api.post('/running-records', {
            runDate,
            distanceKm: Number(distanceKm),
            durationSeconds: Number(totalDurationSeconds),
            memo
        });

        setDistanceKm('');
        setDurationHours('');
        setDurationMinutes('');
        setDurationSeconds('');
        setMemo('');

        await fetchRecords();
    };

    const handleDeleteRecord = async (id: number) => {
        if (window.confirm("삭제하시겠습니까?")) {
            try {
                await api.delete(`/running-records/${id}`);

                await fetchRecords();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const [editingRecordId, setEditingRecordId] = useState<number | null>(null);
    const [editRunDate, setEditRunDate] = useState('');
    const [editDistanceKm, setEditDistanceKm] = useState('');
    const [editDurationHours, setEditDurationHours] = useState('');
    const [editDurationMinutes, setEditDurationMinutes] = useState('');
    const [editDurationSeconds, setEditDurationSeconds] = useState('');
    const [editMemo, setEditMemo] = useState('');


    const handleStartEdit = (record: RunningRecord) => {
        setEditingRecordId(record.id);
        setEditRunDate(record.runDate.split('T')[0]);
        setEditDistanceKm(String(record.distanceKm));

        const hours = Math.floor(record.durationSeconds / 3600);
        const minutes = Math.floor((record.durationSeconds % 3600) / 60);
        const seconds = record.durationSeconds % 60;

        setEditDurationHours(String(hours));
        setEditDurationMinutes(String(minutes));
        setEditDurationSeconds(String(seconds));
        setEditMemo(record.memo ?? '');
    };

    const handleUpdateRecord = async (id: number) => {
        const totalDurationSeconds =
            Number(editDurationHours || 0) * 3600 +
            Number(editDurationMinutes || 0) * 60 +
            Number(editDurationSeconds || 0);

        await api.patch(`/running-records/${id}`, {
            runDate: editRunDate,
            distanceKm: Number(editDistanceKm),
            durationSeconds: totalDurationSeconds,
            memo: editMemo,
        });

        await fetchRecords();
        handleCancelEdit();
    };

    const handleCancelEdit = () => {
        setEditingRecordId(null);
        setEditRunDate('');
        setEditDistanceKm('');
        setEditDurationHours('');
        setEditDurationMinutes('');
        setEditDurationSeconds('');
        setEditMemo('');
    };

    if (isLoading) {
        return <div>loading...</div>;
    }

    return (
        <ProtectedRoute>
            <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
                <section className="mx-auto max-w-4xl">
                    <div className="mb-8">
                        <p className="text-sm font-semibold text-blue-400">
                            RunPilot
                        </p>

                        <h1 className="mt-2 text-4xl font-bold text-white">
                            러닝 기록
                        </h1>

                        <p className="mt-3 text-slate-400">
                            나의 러닝 데이터를 기록하고 관리하세요.
                        </p>
                    </div>
                    <form
                        onSubmit={handleCreateRecord}
                        className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6"
                    >
                        <h2 className="mb-5 text-xl font-bold text-white">러닝 기록 추가</h2>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm text-slate-300">달린 날짜</label>
                                <input
                                    type="date"
                                    value={runDate}
                                    onChange={(event) => setRunDate(event.target.value)}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-slate-300">거리 (km)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={distanceKm}
                                    onChange={(event) => setDistanceKm(event.target.value)}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                                    placeholder="5.2"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-slate-300">
                                    시간
                                </label>

                                <div className="grid grid-cols-3 gap-2">
                                    <input
                                        type="number"
                                        min="0"
                                        value={durationHours}
                                        onChange={(event) => setDurationHours(event.target.value)}
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                                        placeholder="시"
                                    />

                                    <input
                                        type="number"
                                        min="0"
                                        max="59"
                                        value={durationMinutes}
                                        onChange={(event) => setDurationMinutes(event.target.value)}
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                                        placeholder="분"
                                    />

                                    <input
                                        type="number"
                                        min="0"
                                        max="59"
                                        value={durationSeconds}
                                        onChange={(event) => setDurationSeconds(event.target.value)}
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                                        placeholder="초"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-slate-300">메모</label>
                                <input
                                    type="text"
                                    value={memo}
                                    onChange={(event) => setMemo(event.target.value)}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                                    placeholder="가볍게 조깅 완료"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-5 rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white hover:bg-blue-400"
                        >
                            러닝 기록 저장
                        </button>
                    </form>
                    <div className="space-y-4">
                        {records.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-10 text-center">
                                <p className="text-lg font-semibold text-white">
                                    아직 러닝 기록이 없습니다
                                </p>

                                <p className="mt-2 text-sm text-slate-400">
                                    첫 러닝 기록을 추가해보세요 🏃
                                </p>
                            </div>
                        ) : (
                            records.map((record) => (
                                editingRecordId === record.id ? (
                                    <div className="space-y-4" >
                                        <div className="grid gap-3 md:grid-cols-2">
                                            <input
                                                type="date"
                                                value={editRunDate}
                                                onChange={(event) => setEditRunDate(event.target.value)}
                                                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                                            />

                                            <input
                                                type="number"
                                                step="0.1"
                                                value={editDistanceKm}
                                                onChange={(event) => setEditDistanceKm(event.target.value)}
                                                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                                                placeholder="거리"
                                            />
                                        </div>

                                        <div className="grid grid-cols-3 gap-2">
                                            <input
                                                type="number"
                                                min="0"
                                                value={editDurationHours}
                                                onChange={(event) => setEditDurationHours(event.target.value)}
                                                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                                                placeholder="시"
                                            />

                                            <input
                                                type="number"
                                                min="0"
                                                max="59"
                                                value={editDurationMinutes}
                                                onChange={(event) => setEditDurationMinutes(event.target.value)}
                                                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                                                placeholder="분"
                                            />

                                            <input
                                                type="number"
                                                min="0"
                                                max="59"
                                                value={editDurationSeconds}
                                                onChange={(event) => setEditDurationSeconds(event.target.value)}
                                                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                                                placeholder="초"
                                            />
                                        </div>

                                        <textarea
                                            value={editMemo}
                                            onChange={(event) => setEditMemo(event.target.value)}
                                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                                            placeholder="메모"
                                        />

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleUpdateRecord(record.id)}
                                                className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-400"
                                            >
                                                저장
                                            </button>

                                            <button
                                                onClick={handleCancelEdit}
                                                className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800"
                                            >
                                                취소
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        key={record.id}
                                        className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg transition hover:border-blue-500"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-sm text-slate-400">
                                                    {record.runDate.split('T')[0]}
                                                </p>

                                                <p className="mt-1 text-slate-300">
                                                    {formatDuration(record.durationSeconds)}
                                                </p>

                                                <p className="mt-1 text-sm text-blue-400">
                                                    Pace {formatPace(record.paceSecPerKm)}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">

                                                <button
                                                    onClick={() => handleStartEdit(record)}
                                                    className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800"
                                                >
                                                    수정
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteRecord(record.id)}
                                                    className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-400"
                                                >
                                                    삭제
                                                </button>
                                            </div>
                                        </div>

                                        {record.memo && (
                                            <div className="mt-4 rounded-xl bg-slate-950 p-4">
                                                <p className="text-sm text-slate-300">
                                                    {record.memo}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )

                            ))
                        )}
                    </div>
                </section>
            </main>
        </ProtectedRoute>
    );
}
