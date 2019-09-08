import { KPIData } from './_reducers';
import { getKPIListAsync, getKPIList} from './_saga'; 

export function getKPIModule() {
    return {
        id: 'kpi_data',
        reducerMap:{
            kpiState: KPIData
        },
        sagas:[getKPIListAsync, getKPIList]
    }
}