export interface KPIItem {
    value: number,
    growth: number,
    label: string
    valueSuffix?: any,
    growthPrefix?: any,
    valuePrefix?: any,
    growthSuffix?: any,
    color?: string
}

export interface getKPILeftItems {
    (KpiLeftItems: Array<any>) :void
}

export interface getKPIRightItems {
    (KpiRightItems: Array<any>) :void
}

export interface DynamicKPIProps {
    kpiUrl: string,
    loading: boolean,
    kpiItems: Array<KPIItem>,
    getKPIItems: Function,
    getKPILeftItems: getKPILeftItems,
    getKPIRightItems: getKPIRightItems
}