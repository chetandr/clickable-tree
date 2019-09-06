import React, { FC, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Grid,
    Button,
    TextField,
    InputLabel,
    FormControlLabel,
    FormControl,
    Checkbox,
    FormGroup,
    RadioGroup,
    Radio,
    NativeSelect,
} from '@material-ui/core';
import { NewScenarioModalProps, DoneState } from './_dataTypes';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: '15px',
  },
  modal: {
    width: '80%',
    height: '40%'
  },
  title: {
    fontWeight: 'bold',
    fontSize: '20px',
    color: 'black',
  },
  inputLabel: {
    display: 'inline-block',
    width: '30%',
    fontSize: '13px',
    color: 'black',
    marginTop: '5px',
    marginBottom: '5px',
  },
  textField: {
    display: 'inline-block',
    width: "70%",
    height: '10%',
  },
  closeBtn: {
    marginLeft:'auto', display: 'block'
  },
  doneBtn: {
    marginLeft:'auto', display: 'block'
  },
  gridOne: {
      paddingRight: '15px',
      paddingLeft: '10px',
  },
  gridTwo: {
    paddingRight: '15px',
    paddingLeft: '10px',
  }
}));

const ScenarioModal: FC<NewScenarioModalProps> = (props) => {
  const classes = useStyles();
  let scenarioText: any = useRef();
  let descText: any = useRef();
  
  const [open, setOpen] = React.useState(false);
  const [returnState, setReturnState] = React.useState({});
  const [baseScenario, setBaseScenario] = React.useState(props.baseScenario.optionsValue[0]);
  const [applications, setApplications] = React.useState({
        checkedDemand: false,
        checkedESP: false,
        checkedFulfillment: false,
        checkedInventory: false
    });
  let [publish, setPublish] = React.useState(props.publishRadio.optionsValue[0]);
  let [type, setType] = React.useState(props.typeRadio.optionsValue[0]);

  const handleOpen = () => {
      setOpen(true);
  }
  const handleClose =() => {
      setOpen(false);
  }
  const handleBaseScenario = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBaseScenario(event.target.value);
  }
  const handlePublish = (event: React.ChangeEvent<{}>, value: string) => {
    setPublish(value);
  }
  const handleType = (event: React.ChangeEvent<{}>, value: string) => {
    setType(value);
  }
  const handleApplications = (name:any) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setApplications({ ...applications, [name]: event.target.checked });
  }  

  const handleDone = () => {
    const scenarioname = scenarioText.current.value;
    const descp = descText.current.value;
    let returnedState: DoneState = Object.assign({}, 
        {
            scenarioName: scenarioname,
            desciption: descp,
            baseScenario: baseScenario,
            publishRadio: publish,
            applications:{
                Demand: applications.checkedDemand,
                ESP: applications.checkedESP,
                Fulfillment: applications.checkedFulfillment,
                Inventory: applications.checkedInventory
            },
            typeRadio:type,
        });
    setReturnState(returnedState);
  }

  const topGrid = () => {
        return(
            <Grid container justify="center" alignItems="center" spacing={0}>
                <Grid item xs={6}>
                    <InputLabel className={classes.title}>{props.modalTitle}</InputLabel>
                </Grid>
                <Grid item xs={6}>
                    <Button color="primary" className={classes.closeBtn} onClick={handleClose}>X</Button>
                </Grid>
            </Grid>
        );
  }

  const bottomGrid = () => {
        return(
            <Grid container justify="center" alignItems="center" spacing={0}>
                <Grid item xs={6}>
                    <Button onClick={handleClose}>Cancel</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" color="primary" className={classes.doneBtn} onClick={handleDone} >Done</Button>
                </Grid>
            </Grid>
        );
  }

  const leftGrid = () => {
    return(
        <Grid item xs={6} className={classes.gridOne}>
            <InputLabel className={classes.inputLabel} required>{props.scenarioName.label}</InputLabel>
            <TextField inputRef={scenarioText} className={classes.textField}/>
            <InputLabel className={classes.inputLabel}>{props.baseScenario.label}</InputLabel>
            <NativeSelect className={classes.textField} value={baseScenario} onChange={handleBaseScenario}>
                    {props.baseScenario.optionsValue.map(indexValues => (
                        <option value={indexValues}>{indexValues}</option>
                    ))}
            </NativeSelect>

            <InputLabel className={classes.inputLabel}>{props.applications.label}</InputLabel>
            <FormControl className={classes.textField}>
                <FormGroup row>
                    <FormControlLabel control=
                        {<Checkbox 
                            checked={applications.checkedDemand} 
                            onChange={handleApplications('checkedDemand')}/>}
                        label={props.applications.items[0].label} />
                    <FormControlLabel control=
                        {<Checkbox 
                            checked={applications.checkedESP} 
                            onChange={handleApplications('checkedESP')}/>} 
                        label={props.applications.items[1].label} />
                    <FormControlLabel control=
                        {<Checkbox 
                            checked={applications.checkedFulfillment} 
                            onChange={handleApplications('checkedFulfillment')}/>} 
                        label={props.applications.items[2].label} />
                    <FormControlLabel control=
                        {<Checkbox 
                            checked={applications.checkedInventory} 
                            onChange={handleApplications('checkedInventory')}/>} 
                        label={props.applications.items[3].label} />
                </FormGroup>
            </FormControl>                
        </Grid>
    );
  }

  const rightGrid = () => {
      return (
        <Grid item xs={6} className={classes.gridTwo}>
            <div>
                <InputLabel className={classes.inputLabel}>{props.description.label}</InputLabel>
                <TextField inputRef={descText} className={classes.textField}/>
                <InputLabel className={classes.inputLabel} required>{props.publishRadio.label}</InputLabel>
            <FormControl className={classes.textField}>
                <RadioGroup aria-label="publish" name="publish" value={publish} onChange={handlePublish}>
                    <FormGroup row>
                        {props.publishRadio.optionsValue.map(indexValues => (
                            <FormControlLabel value={indexValues} control={<Radio />} label={indexValues} />
                        ))}
                    </FormGroup>                        
                </RadioGroup>
            </FormControl>

            <InputLabel className={classes.inputLabel} required>{props.typeRadio.label}</InputLabel>
            <FormControl className={classes.textField}>
                <RadioGroup aria-label="type" name="type" value={type} onChange={handleType}>
                    <FormGroup row>
                        {props.typeRadio.optionsValue.map(indexValues => (
                            <FormControlLabel value={indexValues} control={<Radio />} label={indexValues} />
                        ))}
                    </FormGroup>
                </RadioGroup>
            </FormControl>                
            </div>
        </Grid>      
    );   
  }

  return (
      <div>
          <p>Click to get full Modal!</p>
          <Button onClick={handleOpen}>Open Modal</Button>
            <Modal aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            className={classes.modal}>
                <div className={classes.paper}>
                    <form >
                        <Grid container>
                            <Grid item xs={12}>
                                {topGrid()}
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container justify="center" alignItems="center" spacing={0}>
                                    {leftGrid()}
                                    {rightGrid()}
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12}>
                                    {bottomGrid()}
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Modal>          
      </div>
  );
}

export default ScenarioModal;