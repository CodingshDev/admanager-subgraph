import {
  AdvertisementManager,
  User,
  Advertisement,
  GlobalStats,
  AchievementUnlocked,
  AdvertisementDeactivated,
  EngagementRecorded,
  EngagementRewardMinted,
  LevelUp,
  NewChiefOfAdvertising,
  NewCommunityChallenge,
  NewReferral,
  Paused,
  ReferralRewardDistributed,
  ReputationUpdated,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  SpecialEventStarted,
  Unpaused,
  WeeklyBonusMinted,
  WithdrawCompleted
} from "./generated";
import { BigInt } from "@envio/bigint";

AdvertisementManager.AchievementUnlocked.handler(async ({ event, context }) => {
  const entity: AchievementUnlocked = {
    id: `${event.transaction.hash}-${event.logIndex}`,
    user: event.params.user,
    achievementId: event.params.achievementId,
    name: event.params.name,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.transaction.hash
  };
  context.AchievementUnlocked.set(entity);
});

AdvertisementManager.AdvertisementDeactivated.handler(async ({ event, context }) => {
  const entity: AdvertisementDeactivated = {
    id: `${event.transaction.hash}-${event.logIndex}`,
    adIndex: event.params.adIndex,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.transaction.hash
  };
  context.AdvertisementDeactivated.set(entity);
});

AdvertisementManager.EngagementRecorded.handler(async ({ event, context }) => {
  const entity: EngagementRecorded = {
    id: `${event.transaction.hash}-${event.logIndex}`,
    adIndex: event.params.adIndex,
    user: event.params.user,
    timestamp: event.params.timestamp,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.transaction.hash
  };
  context.EngagementRecorded.set(entity);

  // Update related entities
  const advertisementId = event.params.adIndex.toString();
  const userId = event.params.user.toString();

  let advertisement = await context.Advertisement.get(advertisementId);
  let user = await context.User.get(userId);
  let globalStats = await context.GlobalStats.get("1");

  if (advertisement && user && globalStats) {
    advertisement.engagementsCount = advertisement.engagementsCount.add(BigInt(1));
    user.engagementsCount = user.engagementsCount.add(BigInt(1));
    globalStats.totalEngagements = globalStats.totalEngagements.add(BigInt(1));

    context.Advertisement.set(advertisement);
    context.User.set(user);
    context.GlobalStats.set(globalStats);
  }
});

AdvertisementManager.EngagementRewardMinted.handler(async ({ event, context }) => {
  const entity: EngagementRewardMinted = {
    id: `${event.transaction.hash}-${event.logIndex}`,
    user: event.params.user,
    amount: event.params.amount,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.transaction.hash
  };
  context.EngagementRewardMinted.set(entity);
});

AdvertisementManager.LevelUp.handler(async ({ event, context }) => {
  const entity: LevelUp = {
    id: `${event.transaction.hash}-${event.logIndex}`,
    user: event.params.user,
    newLevel: event.params.newLevel,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.transaction.hash
  };
  context.LevelUp.set(entity);

  // Update User entity
  const userId = event.params.user.toString();
  let user = await context.User.get(userId);
  if (user) {
    user.level = event.params.newLevel;
    context.User.set(user);
  }
});

AdvertisementManager.NewAdvertisement.handler(async ({ event, context }) => {
  const advertiserId = event.params.advertiser.toString();
  const referrerId = event.params.referrer.toString();

  let advertiser = await context.User.get(advertiserId);
  let globalStats = await context.GlobalStats.get("1");

  if (!globalStats) {
    globalStats = {
      id: "1",
      totalAdvertisements: BigInt(0),
      totalEngagements: BigInt(0),
      totalUsers: BigInt(0),
      totalRewardsMinted: BigInt(0)
    };
  }

  if (!advertiser) {
    advertiser = {
      id: advertiserId,
      address: event.params.advertiser,
      level: BigInt(1),
      reputation: BigInt(0),
      achievementsCount: BigInt(0),
      engagementsCount: BigInt(0),
      totalRewardsEarned: BigInt(0)
    };
    globalStats.totalUsers = globalStats.totalUsers.add(BigInt(1));
  }

  const advertisement: Advertisement = {
    id: `${event.transaction.hash}-${event.logIndex}`,
    link: event.params.link,
    imageUrl: event.params.imageUrl,
    price: event.params.price,
    advertiser: advertiser.id,
    engagementsCount: BigInt(0),
    active: true,
    referrer: referrerId !== "0x0000000000000000000000000000000000000000" ? referrerId : undefined
  };

  globalStats.totalAdvertisements = globalStats.totalAdvertisements.add(BigInt(1));

  context.Advertisement.set(advertisement);
  context.User.set(advertiser);
  context.GlobalStats.set(globalStats);
});

AdvertisementManager.NewChiefOfAdvertising.handler(async ({ event, context }) => {
  const entity: NewChiefOfAdvertising = {
    id: `${event.transaction.hash}-${event.logIndex}`,
    newChief: event.params.newChief,
    tokenBalance: event.params.tokenBalance,
    referralLevel: event.params.referralLevel,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.transaction.hash
  };
  context.NewChiefOfAdvertising.set(entity);
});

AdvertisementManager.NewCommunityChallenge.handler(async ({ event, context }) => {
  const entity: NewCommunityChallenge = {
    id: `${event.transaction.hash}-${event.logIndex}`,
    description: event.params.description,
    goal: event.params.goal,
    reward: event.params.reward,
    deadline: event.params.deadline,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.transaction.hash
  };
  context.NewCommunityChallenge.set(entity);
});

AdvertisementManager.NewReferral.handler(async ({ event, context }) => {
  const entity: NewReferral = {
    id: `${event.transaction.hash}-${event.logIndex}`,
    referred: event.params.referred,
    referrer: event.params.referrer,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.transaction.hash
  };
  context.NewReferral.set(entity);
});

AdvertisementManager.Paused.handler(async ({ event, context }) => {
  const entity: Paused = {
    id: `${event.transaction.hash}-${event.logIndex}`,
    account: event.params.account,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.transaction.hash
  };
  context.Paused.set(entity);
});

AdvertisementManager.ReferralRewardDistributed.handler(async ({ event, context }) => {
  const entity: ReferralRewardDistributed = {
    id: `${event.transaction.hash}-${event.logIndex}`,
    referrer: event.params.referrer,
    reward: event.params.reward,
    level: event.params.level,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.transaction.hash
  };
  context.ReferralRewardDistributed.set(entity);
});

AdvertisementManager.ReputationUpdated.handler(async ({ event, context }) => {
  const entity: ReputationUpdated = {
    id: `${event.transaction.hash}-${event.logIndex}`,
    user: event.params.user,
    newReputation: event.params.newReputation,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.transaction.hash
  };
  context.ReputationUpdated.set(entity);

  // Update User entity
  const userId = event.params.user.toString();
  let user = await context.User.get(userId);
  if (user) {
    user.reputation = event.params.newReputation;
    context.User.set(user);
  }
});

AdvertisementManager.RoleAdminChanged.handler(async ({ event, context }) => {
  const entity: RoleAdminChanged = {
    id: `${event.transaction.hash}-${event.logIndex}`,
    role: event.params.role,
    previousAdminRole: event.params.previousAdminRole,
    newAdminRole: event.params.newAdminRole,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.transaction.hash
  };
  context.RoleAdminChanged.set(entity);
});

AdvertisementManager.RoleGranted.handler(async ({ event, context }) => {
  const entity: RoleGranted = {
    id: `${event.transaction.hash}-${event.logIndex}`,
    role: event.params.role,
    account: event.params.account,
    sender: event.params.sender,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.transaction.hash
  };
  context.RoleGranted.set(entity);
});

AdvertisementManager.RoleRevoked.handler(async ({ event, context }) => {
  const entity: RoleRevoked = {
    id: `${event.transaction.hash}-${event.logIndex}`,
    role: event.params.role,
    account: event.params.account,
    sender: event.params.sender,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.transaction.hash
  };
  context.RoleRevoked.set(entity);
});

AdvertisementManager.SpecialEventStarted.handler(async ({ event, context }) => {
  const entity: SpecialEventStarted = {
    id: `${event.transaction.hash}-${event.logIndex}`,
    name: event.params.name,
    startTime: event.params.startTime,
    endTime: event.params.endTime,
    rewardMultiplier: event.params.rewardMultiplier,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.transaction.hash
  };
  context.SpecialEventStarted.set(entity);
});

AdvertisementManager.Unpaused.handler(async ({ event, context }) => {
  const entity: Unpaused = {
    id: `${event.transaction.hash}-${event.logIndex}`,
    account: event.params.account,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.transaction.hash
  };
  context.Unpaused.set(entity);
});

AdvertisementManager.WeeklyBonusMinted.handler(async ({ event, context }) => {
  const entity: WeeklyBonusMinted = {
    id: `${event.transaction.hash}-${event.logIndex}`,
    user: event.params.user,
    amount: event.params.amount,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.transaction.hash
  };
  context.WeeklyBonusMinted.set(entity);
});

AdvertisementManager.WithdrawCompleted.handler(async ({ event, context }) => {
  const entity: WithdrawCompleted = {
    id: `${event.transaction.hash}-${event.logIndex}`,
    owner: event.params.owner,
    amount: event.params.amount,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.transaction.hash
  };
  context.WithdrawCompleted.set(entity);
});