export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ko-KR');
};

export const formatDistance = (distanceKm: number) => {
  return `${distanceKm.toFixed(1)} km`;
};

export const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainSeconds = seconds % 60;

  if (remainSeconds === 0) {
    return `${minutes}분`;
  }

  return `${minutes}분 ${remainSeconds}초`;
};

export const formatPace = (paceSecPerKm: number | null) => {
  if (paceSecPerKm === null) {
    return '-';
  }

  const minutes = Math.floor(paceSecPerKm / 60);
  const seconds = paceSecPerKm % 60;

  return `${minutes}'${seconds.toString().padStart(2, '0')}" /km`;
};
