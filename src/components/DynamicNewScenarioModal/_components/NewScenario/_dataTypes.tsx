export interface ScenarioProps {
    label: string,
    textValue: string    
}

export interface DescriptionProps {
    label: string,
    textValue: string    
}

export interface BaseScenarioProps {
    label: string,
    optionsValue: Array<string>,
}

export interface PublishProps {
    label: string,
    optionsValue: Array<string>,
}

export interface ApplicationItem {
    label :string,
    checked: boolean
}

export interface ApplicationsProps {
    label: string,
    items: Array<ApplicationItem>
}

export interface TypeProps {
    label: string,
    optionsValue: Array<string>,
}

export interface NewScenarioModalProps {
    modalTitle: string,
    scenarioName: ScenarioProps,
    description: DescriptionProps,
    baseScenario: BaseScenarioProps,
    publishRadio: PublishProps,
    applications: ApplicationsProps,
    typeRadio: TypeProps,
}

export interface DoneState {
    scenarioName: string,
    desciption: string,
    baseScenario: string,
    publishRadio: string,
    applications: {
        Demand: boolean,
        ESP: boolean,
        Fulfillment: boolean,
        Inventory: boolean
    },
    typeRadio: string,    
}
