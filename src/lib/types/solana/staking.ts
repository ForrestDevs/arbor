export interface StakingMetric {
    label: string;
    metricKey: string;
    defaultValue: number;
}

export interface StakingProvider {
    name: string;
    slug: string;
    logoUrl: string;
    isVerified: boolean;
}

export interface OutputAsset {
    symbol: string;
}

export interface RewardOption {
    outputAssets: OutputAsset[];
    providers: StakingProvider[];
    metrics: StakingMetric[];
}

export interface StakingRewardsResponse {
    data: {
        rewardOptions: RewardOption[];
    };
} 