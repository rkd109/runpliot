const path = require('path');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('../generated/prisma');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const DEMO_EMAIL = 'demo@example.com';
const DEMO_PASSWORD = 'password123';
const DEMO_NICKNAME = 'demo-runner';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

const startOfDay = (date) => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

const endOfDay = (date) => {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
};

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const getStartOfWeek = (date) => {
  const result = startOfDay(date);
  const daysFromMonday = (result.getDay() + 6) % 7;
  result.setDate(result.getDate() - daysFromMonday);
  return result;
};

const getDateKey = (date) => startOfDay(date).toISOString().slice(0, 10);

const getPaceSecPerKm = (distanceKm, durationSec) => Math.floor(durationSec / distanceKm);

const toRunRecord = ({ userId, date, distanceKm, durationSec, memo }) => ({
  userId,
  runDate: startOfDay(date),
  distanceKm,
  durationSec,
  paceSecPerKm: getPaceSecPerKm(distanceKm, durationSec),
  memo,
});

const getUniqueSortedDates = (dates) => {
  const dateByKey = new Map();

  dates.forEach((date) => {
    dateByKey.set(getDateKey(date), startOfDay(date));
  });

  return [...dateByKey.values()].sort((first, second) => first.getTime() - second.getTime());
};

const main = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required to run seed.');
  }

  const today = startOfDay(new Date());
  const weekStart = getStartOfWeek(today);
  const weekEnd = endOfDay(addDays(weekStart, 6));
  const yesterday = addDays(today, -1);
  const tomorrow = addDays(today, 1);
  const completedTrainingDate = weekStart < today ? weekStart : today;
  const missedTrainingDate = yesterday >= weekStart ? yesterday : null;
  const futureTrainingDate = tomorrow <= weekEnd ? tomorrow : weekEnd;
  const planDates = getUniqueSortedDates([
    completedTrainingDate,
    ...(missedTrainingDate ? [missedTrainingDate] : []),
    today,
    futureTrainingDate,
  ]);

  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);
  const user = await prisma.user.upsert({
    where: {
      email: DEMO_EMAIL,
    },
    update: {
      passwordHash,
      nickname: DEMO_NICKNAME,
    },
    create: {
      email: DEMO_EMAIL,
      passwordHash,
      nickname: DEMO_NICKNAME,
    },
  });

  await prisma.trainingPlanItem.deleteMany({
    where: {
      trainingPlan: {
        userId: user.id,
      },
    },
  });
  await prisma.trainingPlan.deleteMany({
    where: {
      userId: user.id,
    },
  });
  await prisma.runningRecord.deleteMany({
    where: {
      userId: user.id,
    },
  });
  await prisma.runnerProfile.deleteMany({
    where: {
      userId: user.id,
    },
  });

  await prisma.runnerProfile.create({
    data: {
      userId: user.id,
      experienceLevel: 'INTERMEDIATE',
      weeklyRunCount: 4,
      comfortableDistanceKm: 5,
      goal: '10km 완주 준비',
      planStartDate: weekStart,
      preferredTrainingDays: ['MONDAY', 'WEDNESDAY', 'FRIDAY', 'SUNDAY'],
    },
  });

  const baselineRecords = [
    { date: addDays(weekStart, -10), distanceKm: 4.2, durationSec: 1600, memo: '가벼운 조깅' },
    { date: addDays(weekStart, -8), distanceKm: 5.1, durationSec: 1900, memo: '편안한 이지런' },
    { date: addDays(weekStart, -6), distanceKm: 6.4, durationSec: 2460, memo: '주말 거리주' },
    { date: addDays(weekStart, -4), distanceKm: 4.8, durationSec: 1780, memo: '퇴근 후 러닝' },
    { date: addDays(weekStart, -2), distanceKm: 7.2, durationSec: 2820, memo: '롱런 테스트' },
  ];

  const completedTrainingRecord = {
    date: completedTrainingDate,
    distanceKm: 5,
    durationSec: 1800,
    memo: '훈련 계획: 완료한 이지런',
  };

  await prisma.runningRecord.createMany({
    data: [...baselineRecords, completedTrainingRecord].map((record) =>
      toRunRecord({
        userId: user.id,
        ...record,
      }),
    ),
  });

  await prisma.trainingPlan.create({
    data: {
      userId: user.id,
      title: '이번 주 10km 준비 플랜',
      goalType: 'GENERAL',
      level: 'INTERMEDIATE',
      startDate: weekStart,
      endDate: weekEnd,
      sourceType: 'SEED',
      items: {
        create: planDates.map((date, index) => {
          const isCompletedDate = getDateKey(date) === getDateKey(completedTrainingDate);
          const isToday = getDateKey(date) === getDateKey(today);
          const workoutType =
            index === planDates.length - 1
              ? 'LONG_RUN'
              : isToday
                ? 'TEMPO_RUN'
                : isCompletedDate
                  ? 'EASY_RUN'
                  : 'RECOVERY_RUN';

          return {
            planDate: date,
            workoutType,
            distanceKm: workoutType === 'LONG_RUN' ? 8 : workoutType === 'TEMPO_RUN' ? 5.5 : 5,
            targetPaceSecPerKm: 360,
            description:
              workoutType === 'LONG_RUN'
                ? '이번 주 가장 긴 거리로 여유 있게 달립니다.'
                : workoutType === 'TEMPO_RUN'
                  ? '편한 속도보다 살짝 빠르게 유지합니다.'
                  : '무리하지 않는 편안한 러닝입니다.',
            sortOrder: index + 1,
          };
        }),
      },
    },
  });

  console.log(`Seed complete: ${DEMO_EMAIL} / ${DEMO_PASSWORD}`);
};

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
