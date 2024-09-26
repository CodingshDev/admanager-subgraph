# AdvertisementManager Subgraph

This subgraph indexes events from the AdvertisementManager contract on the Base network. It provides a comprehensive view of advertisements, user activities, and system statistics.

## Queries

Here are some example queries you can use to interact with the subgraph:

### Global Statistics

```graphql
{
  globalStats(id: "1") {
    totalAdvertisements
    totalEngagements
    totalUsers
    totalRewardsMinted
  }
}
```

### User Information

Get user details:

```graphql
{
  user(id: "0x1234...") {
    address
    level
    reputation
    achievementsCount
    engagementsCount
    totalRewardsEarned
    referrals {
      id
    }
    referrer {
      id
    }
  }
}
```

List top users by reputation:

```graphql
{
  users(first: 10, orderBy: reputation, orderDirection: desc) {
    id
    address
    reputation
    level
  }
}
```

### Advertisements

Get advertisement details:

```graphql
{
  advertisement(id: "0x5678...") {
    link
    imageUrl
    price
    advertiser {
      id
      address
    }
    referrer {
      id
      address
    }
    engagementsCount
    active
  }
}
```

List recent active advertisements:

```graphql
{
  advertisements(
    first: 20,
    orderBy: blockTimestamp,
    orderDirection: desc,
    where: { active: true }
  ) {
    id
    link
    imageUrl
    price
    advertiser {
      address
    }
    engagementsCount
  }
}
```

### Engagements

Get recent engagements:

```graphql
{
  engagementRecordeds(first: 100, orderBy: blockTimestamp, orderDirection: desc) {
    adIndex
    user
    timestamp
  }
}
```

### Achievements

List recent achievements:

```graphql
{
  achievementUnlockeds(first: 50, orderBy: blockTimestamp, orderDirection: desc) {
    user
    achievementId
    name
  }
}
```

### Special Events

Get details of recent special events:

```graphql
{
  specialEventStarteds(first: 10, orderBy: startTime, orderDirection: desc) {
    name
    startTime
    endTime
    rewardMultiplier
  }
}
```

### Complex Queries

Get user with their advertisements and engagements:

```graphql
{
  user(id: "0x1234...") {
    address
    level
    reputation
    advertisements {
      id
      link
      engagementsCount
    }
    engagementRecordeds {
      adIndex
      timestamp
    }
  }
}
```

Get top advertisers by engagement count:

```graphql
{
  advertisements(first: 10, orderBy: engagementsCount, orderDirection: desc) {
    advertiser {
      address
      level
      reputation
    }
    link
    engagementsCount
  }
}
```

## Notes

- Replace `"0x1234..."` and `"0x5678..."` with actual entity IDs when querying.
- The `first` parameter in list queries can be adjusted to retrieve more or fewer results.
- Use `skip` parameter for pagination, e.g., `(first: 20, skip: 20)` for the second page.
- Combine `where` conditions for more specific queries, e.g., `where: { active: true, price_gt: "1000000000000000000" }`.

For more information on how to build queries, refer to [The Graph's query API documentation](https://thegraph.com/docs/en/querying/graphql-api/).