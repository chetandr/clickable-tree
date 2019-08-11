import React, { FunctionComponent, Fragment } from 'react';
import {
    Checkbox,
    List,
    ListItem,
    ListItemText,
    Collapse,
    Typography,
    TextField,
    makeStyles,
    createStyles,
    Button,
    Theme,
    IconButton,
    Box,
    Grid
} from '@material-ui/core';
import { AddBoxOutlined, IndeterminateCheckBoxOutlined, Remove, SaveSharp } from '@material-ui/icons';
import { map, isArray,indexOf, compact} from 'lodash';
import { ClListProps, ClListItem, ClListState } from './_dataTypes';
import NodeModel from './_nodeModel';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(0),
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
        smallFont: {
            fontSize: .5
        },
        highlight: {
            background: theme.palette.secondary.light,
            padding: theme.spacing(.3,0,.3,.3)
        },
        listcontainer: {
            borderLeft: '1px solid',
            borderRight: '1px solid',
            borderBottom: '1px solid',
            height: theme.spacing(60),
            overflowY: 'scroll'

        }
    }),
);

const CheckBoxTreeView: FunctionComponent<ClListProps> = (props) => {

    const classes = useStyles();
    const initialChecked: Array<string|number> = [];
    const initialOpen: Array<string|number> = [];
    const initialSearch: string = ''
    const collapsibelTreeView = props.collapsibelTreeView || false;
    const showSelectAll = props.showSelectAll || true;
    const [treeState, setTreeState] = React.useState<ClListState>({checked:initialChecked, open:initialOpen, search:initialSearch});
    const [searchString, setSearch] = React.useState("");
    const updateButtonLabel = props.updateButtonLabel || "Update View"
    let nodes: NodeModel = new NodeModel(props.items, treeState, searchString);

    const handleOpen = (value: string|number) => () => {
        nodes.selectOpen(value);
        setTreeState({checked: [...treeState.checked], open: nodes.open, search: treeState.search});
    };

    const handleToggle = (value: string|number) => () => {
        if(indexOf(treeState.checked, value) === -1) {
            nodes.selectItems(value);
        } else {
            nodes.deSelectItems(value);
        }
        setTreeState({open: [...treeState.open], checked: nodes.checked, search: treeState.search});
    };

    const handleSearch = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
      };
    const getFilterHighlight = (label: string) => {
        let text;
        const start = label.toLowerCase().indexOf(searchString.toLowerCase())
        if(searchString &&  start !== -1) {
            const end = start + `${searchString}`.length;
            text = <ListItemText className={classes.smallFont} id={label}>{start === 0 ? "" : label.slice(0,start-1)}<span className={classes.highlight}>{label.slice(start, end)}</span>{label.slice(end)}</ListItemText>
        } else {
            text = <ListItemText id={label} className={classes.smallFont}>{label}</ListItemText>
        }

        return text;
    }

    const getlist = (items?: Array<ClListItem>, depth: number = 0) => {

        depth++;
        const list = map(items, listItem => {
            return listItem ?  (
                <Fragment key={`fragment-${listItem.value}`}>

                    <ListItem key={listItem.value} role={undefined} >
                        { collapsibelTreeView  && <IconButton  onClick={handleOpen(listItem.value)}>
                            {isArray(listItem.children) && listItem.children.length > 0 ? (treeState.open.indexOf(`${listItem.value}`) !== -1 ? <IndeterminateCheckBoxOutlined /> : <AddBoxOutlined />) : <Remove />}
                        </IconButton>
                        }
                            <Checkbox
                                edge="start"
                                checked={treeState.checked.indexOf(listItem.value) !== -1}
                                tabIndex={-1}
                                disableRipple={true}
                                onClick={handleToggle(listItem.value)}
                            />
                        {getFilterHighlight(listItem.label)}
                    </ListItem>
                    <Collapse in={!collapsibelTreeView || treeState.open.indexOf(`${listItem.value}`) !== -1}>
                        {getlist(listItem.children, depth)}
                    </Collapse>
                </Fragment>
            ) : null;
        });
        if (depth === 1 && showSelectAll) {
            const allitem = (<ListItem key='all' role={undefined} >
                    <Checkbox
                        edge="start"
                        checked={treeState.checked.indexOf("all") !== -1}
                        tabIndex={-1}
                        disableRipple
                        onClick={handleToggle('all')}
                    />
                <ListItemText id="all" primary="All" />
            </ListItem>)
            list.unshift(allitem);
        }
        return (<List className={depth > 1 ? classes.nested : classes.root}>{compact(list)}</List>)


    }
    const selectedCount: number = nodes.getSelectedCount();
    const list = getlist(nodes.filterItems);
    const handleUpdateView : React.MouseEventHandler = (event: React.MouseEvent<Element, MouseEvent>) => {
       if(props.updateButtonAction) {
           props.updateButtonAction(event)
      }
    }
    return (
        <React.Fragment>
            <Box className={classes.listcontainer}>{list}</Box>
            <Grid container> 
                <Grid item xs={6}> 
                    <Box color={"text.disabled"}>
                        <Typography variant="subtitle1">
                            {selectedCount > 0 ? `${selectedCount} node selected`: 'None selected'}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Grid container justify="flex-end" direction="column" alignItems="flex-end">
                        <IconButton disableFocusRipple={true} disableRipple={true}>
                            <SaveSharp></SaveSharp>
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Box color="text.disabled">
                        <Typography variant="subtitle1">
                            Clear All
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Box m={1}>
                <TextField
                    id="standard-name"
                    label="Search"
                    value={searchString}
                    onChange={handleSearch('name')}
                    margin="dense"
                    variant="outlined"
                    fullWidth
                />
            </Box>
            <Box m={1}>
                { props.updateButton && <Button onClick={handleUpdateView} variant="contained" color="primary" fullWidth>{updateButtonLabel}</Button>}
            </Box>
        </React.Fragment>
    )
}

export * from './_dataTypes';
export default CheckBoxTreeView;