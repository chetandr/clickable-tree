import React, { FC } from 'react';
import { connect } from 'react-redux';
import {DynamicModuleLoader} from 'redux-dynamic-modules';
import { DynamicKPIProps } from './_dataTypes';
import KPI from './_components/KPI'
import Loading from '../Loading';
import { GET_ITEMS, getKPIModule }  from './_redux' 

const ConnectedKPI : FC<DynamicKPIProps> = (props) => {
    if(props.kpiItems.length === 0 && props.kpiUrl) {
        props.getKPIItems(props.kpiUrl);
    }
        return (
            <DynamicModuleLoader modules={[getKPIModule()]}>
                {props.loading ? <Loading/> : <KPI {...props}/>}
            </DynamicModuleLoader>
        )
}

const mapStateToProps = (state: any) => {
    if(!state.kpiState) {
        return {};
    } else {
        return state.kpiState;
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        getKPIItems: (url: string) => {
            console.log("getKPIItems");
            dispatch({ type: GET_ITEMS, url })
        }
      };
}

const DynamicKPI =  connect(
    mapStateToProps, 
    mapDispatchToProps
)(ConnectedKPI);
export default DynamicKPI;
export * from './_dataTypes'; 