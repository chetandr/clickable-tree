import React, { FunctionComponent } from 'react';
import {
    Typography, 
    Card,
    CardContent,
    Grid,
    makeStyles,
    createStyles,
    Theme,
    Button,
    Paper
} from '@material-ui/core';

import { KPIList, KPIProps } from './_datatypes';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '150px',
      height: '65px',
      display: "inline-block",
      padding: '0px',
      margin: '5px',
    },
    card: {
        width: '150px',
        height: '65px',
        display: "inline-block",
        border:'5px',
        marginTop: '5px',
      },
    typograpghyValue: {
        fontSize: "17px",
        fontFamily: "Arial, Roboto",
        fontWeight: "bold",
        color: "#58585A",
        flexDirection: "column"
    },
    typographyLabel: {
        fontSize: "12px",
        fontFamily: "Arial, Roboto",
        fontWeight: "lighter",
        color: "#414144"
    },
    button: {
        height: '65px',
        width: '60px',
        borderRadius: '4px',
        display: 'inline-block',
        marginTop: '5px',
        color: "#58585A",
    },
    paper: {
        borderRadius: '10px',
    }
  })
);

const KPI: FunctionComponent<KPIProps> = (props) => {
    let taskSlider: any = React.createRef();
    const handlePrev = () => {
        taskSlider.current.slickPrev();
    }
    const handleNext = () => {
        taskSlider.current.slickNext();
    }
    //left arrow
    // const ArrowLeft = () => {
    //     <button onClick={handlePrev}>Prev</button>        
    // }
    //right arrow
    // const ArrowRight = () => {
    //     <button onClick={handleNext}>Next</button>
    // }    

    const classes = useStyles();
    const settings = {
        slidesToShow: 4,
        initialSlide: 0,
        speed: 500,
        focusOnSelect: false,
        arrows: false,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                infinite: true,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
              }
            }
          ]
      };

    const getKpiItems = (items: ReadonlyArray<KPIList>) => {
        const kpi = items.map(kpi => {
            if(!kpi.growthPrefix && !kpi.growth && !kpi.growthSuffix) {
                return (
                    <Card style={{borderLeft: `5px solid ${kpi.color}`}} className={classes.card}>
                        <CardContent>
                            <Typography className={classes.typograpghyValue}>{kpi.valuePrefix}{kpi.value}{kpi.valueSuffix}
                            <span className={classes.typographyLabel}>{kpi.growthPrefix}{kpi.growth}{kpi.growthSuffix}</span>
                            </Typography>
                            <Typography className={classes.typographyLabel}>{kpi.label}</Typography>
                        </CardContent>
                    </Card>
                )
            }
            return (
                <Card style={{borderLeft: `5px solid ${kpi.color}`}} className={classes.card}>
                    <CardContent>
                        <Typography className={classes.typograpghyValue}>{kpi.valuePrefix}{kpi.value}{kpi.valueSuffix}
                        &nbsp;&nbsp;
                        <span className={classes.typographyLabel}>({kpi.growthPrefix}{kpi.growth}{kpi.growthSuffix})</span>
                        </Typography>
                        <Typography className={classes.typographyLabel}>{kpi.label}</Typography>
                    </CardContent>
                </Card>
            );
        })
        return kpi;
    }

    return (
        <React.Fragment>
            <div>
            <Paper className={classes.paper}>                
                <Grid container>
                    <Grid item xs={2}>
                        <div>
                        <Card className={classes.root}>
                            <CardContent>
                                <Typography className={classes.typograpghyValue}>KPI Impact</Typography>
                            </CardContent>
                        </Card>
                        </div>
                    </Grid>
                    <Grid item xs={1}>
                        {/* <button onClick={handlePrev}>Prev</button> */}
                        <div>
                        <Button className={classes.button} onClick={handlePrev}>{"<"}</Button>
                        </div>
                    </Grid>
                    <Grid item xs={8}>
                        <div>
                        <Slider {...settings} ref={taskSlider} {...props} >
                            {getKpiItems(props.kpiItems)}
                        </Slider>
                        </div>                        
                    </Grid>
                    <Grid item xs={1}>
                        {/* <button onClick={handleNext}>Next</button> */}
                        <div>
                        <Button className={classes.button} onClick={handleNext}>{">"}</Button>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
            </div>       
        </React.Fragment>
    );
}

export default KPI;