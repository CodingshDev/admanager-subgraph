import { BigInt } from "@graphprotocol/graph-ts"
import {
  AchievementUnlocked as AchievementUnlockedEvent,
  AdvertisementDeactivated as AdvertisementDeactivatedEvent,
  EngagementRecorded as EngagementRecordedEvent,
  EngagementRewardMinted as EngagementRewardMintedEvent,
  LevelUp as LevelUpEvent,
  NewAdvertisement as NewAdvertisementEvent,
  NewChiefOfAdvertising as NewChiefOfAdvertisingEvent,
  NewCommunityChallenge as NewCommunityChallengeEvent,
  NewReferral as NewReferralEvent,
  Paused as PausedEvent,
  ReferralRewardDistributed as ReferralRewardDistributedEvent,
  ReputationUpdated as ReputationUpdatedEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  SpecialEventStarted as SpecialEventStartedEvent,
  Unpaused as UnpausedEvent,
  WeeklyBonusMinted as WeeklyBonusMintedEvent,
  WithdrawCompleted as WithdrawCompletedEvent
} from "../generated/AdvertisementManager/AdvertisementManager"
import {
  AchievementUnlocked,
  AdvertisementDeactivated,
  EngagementRecorded,
  EngagementRewardMinted,
  LevelUp,
  NewAdvertisement,
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
  WithdrawCompleted,
  Advertisement, User, GlobalStats
} from "../generated/schema"

export function handleAchievementUnlocked(
  event: AchievementUnlockedEvent
): void {
  let entity = new AchievementUnlocked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.achievementId = event.params.achievementId
  entity.name = event.params.name

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAdvertisementDeactivated(
  event: AdvertisementDeactivatedEvent
): void {
  let entity = new AdvertisementDeactivated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.adIndex = event.params.adIndex

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEngagementRecorded(event: EngagementRecordedEvent): void {
  let entity = new EngagementRecorded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.adIndex = event.params.adIndex
  entity.user = event.params.user
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEngagementRewardMinted(
  event: EngagementRewardMintedEvent
): void {
  let entity = new EngagementRewardMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLevelUp(event: LevelUpEvent): void {
  let entity = new LevelUp(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.newLevel = event.params.newLevel

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewAdvertisement(event: NewAdvertisementEvent): void {
  let advertisement = new Advertisement(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  let advertiser = User.load(event.params.advertiser.toHex())
  let referrer = User.load(event.params.referrer.toHex())
  let globalStats = GlobalStats.load("1")

  if (globalStats == null) {
    globalStats = new GlobalStats("1")
    globalStats.totalAdvertisements = BigInt.fromI32(0)
    globalStats.totalEngagements = BigInt.fromI32(0)
    globalStats.totalUsers = BigInt.fromI32(0)
    globalStats.totalRewardsMinted = BigInt.fromI32(0)
  }

  if (advertiser == null) {
    advertiser = new User(event.params.advertiser.toHex())
    advertiser.address = event.params.advertiser
    advertiser.level = BigInt.fromI32(1)
    advertiser.reputation = BigInt.fromI32(0)
    advertiser.achievementsCount = BigInt.fromI32(0)
    advertiser.engagementsCount = BigInt.fromI32(0)
    advertiser.totalRewardsEarned = BigInt.fromI32(0)
    globalStats.totalUsers = globalStats.totalUsers.plus(BigInt.fromI32(1))
  }

  advertisement.link = event.params.link
  advertisement.imageUrl = event.params.imageUrl
  advertisement.price = event.params.price
  advertisement.advertiser = advertiser.id
  advertisement.engagementsCount = BigInt.fromI32(0)
  advertisement.active = true

  if (referrer != null) {
    advertisement.referrer = referrer.id
  }

  globalStats.totalAdvertisements = globalStats.totalAdvertisements.plus(BigInt.fromI32(1))

  advertisement.save()
  advertiser.save()
  globalStats.save()
}

export function handleNewChiefOfAdvertising(
  event: NewChiefOfAdvertisingEvent
): void {
  let entity = new NewChiefOfAdvertising(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newChief = event.params.newChief
  entity.tokenBalance = event.params.tokenBalance
  entity.referralLevel = event.params.referralLevel

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewCommunityChallenge(
  event: NewCommunityChallengeEvent
): void {
  let entity = new NewCommunityChallenge(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.description = event.params.description
  entity.goal = event.params.goal
  entity.reward = event.params.reward
  entity.deadline = event.params.deadline

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewReferral(event: NewReferralEvent): void {
  let entity = new NewReferral(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.referred = event.params.referred
  entity.referrer = event.params.referrer

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleReferralRewardDistributed(
  event: ReferralRewardDistributedEvent
): void {
  let entity = new ReferralRewardDistributed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.referrer = event.params.referrer
  entity.reward = event.params.reward
  entity.level = event.params.level

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleReputationUpdated(event: ReputationUpdatedEvent): void {
  let entity = new ReputationUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.newReputation = event.params.newReputation

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole
  entity.newAdminRole = event.params.newAdminRole

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSpecialEventStarted(
  event: SpecialEventStartedEvent
): void {
  let entity = new SpecialEventStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.name = event.params.name
  entity.startTime = event.params.startTime
  entity.endTime = event.params.endTime
  entity.rewardMultiplier = event.params.rewardMultiplier

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWeeklyBonusMinted(event: WeeklyBonusMintedEvent): void {
  let entity = new WeeklyBonusMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawCompleted(event: WithdrawCompletedEvent): void {
  let entity = new WithdrawCompleted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
