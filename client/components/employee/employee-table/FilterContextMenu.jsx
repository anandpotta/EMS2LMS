import React, { Component } from 'react';
import qs from 'query-string';

import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui-icons/Search';
import ClearIcon from 'material-ui-icons/Clear';
import ClearAllIcon from 'material-ui-icons/ClearAll';
import Input from 'material-ui/Input/Input';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';


import EmployeeAddTableItem from './EmployeeAddTableItem.jsx';
import FilterStatusDropdown from './FilterStatusDropdown.jsx';

const toolbarStyleSheet = theme => ({
    root: {
        paddingRight: 2,
    },
    iconRoot: {
        width: 48,
        height: 48
    },
    highlight:
    theme.palette.type === 'light'
        ? {
            color: theme.palette.accent.A700,
            backgroundColor: theme.palette.accent.A100,
        }
        : {
            color: theme.palette.accent.A100,
            backgroundColor: theme.palette.accent.A700,
        },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
        marginLeft: theme.spacing.unit,
    }
});

class FilterContextMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: ""
        }
        this.onChange = this.onChange.bind(this);
        this.clearSearchField = this.clearSearchField.bind(this);
    }
    onChange(event) {
        this.setState({ search: event.target.value }, () => {
            let query_string = qs.stringify({ search: this.state.search });
            this.props.history.push({ search: query_string })
        });
        // this.setState({ search: event.target.value });
    }
    clearSearchField() {

    }
    render() {
        const classes = this.props.classes;
        return (
            <Toolbar
                className={classNames(classes.root, {
                    [classes.highlight]: false,
                })}
            >
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <Input
                    placeholder="Search Owner"
                    className={classes.input}
                    fullWidth
                    value={this.state.search}
                    disableUnderline
                    inputProps={{
                        'aria-label': 'Search',
                    }}
                    onChange={this.onChange}
                />
                <IconButton aria-label="Clear" onClick={this.clearSearchField}>
                    <ClearIcon />
                </IconButton>
                <div className={classes.title}>
                    <Typography type="subheading" >
                        Status:
                    </Typography>
                </div>
                <FilterStatusDropdown history={this.props.history} />

                <div className={classes.spacer} />
                <IconButton aria-label="Clear" onClick={this.props.closeFilter}>
                    <ClearAllIcon />
                </IconButton>

                <EmployeeAddTableItem />

            </Toolbar>
        )
    }
}
const componentWithStyles = withStyles(toolbarStyleSheet)(FilterContextMenu);
export default componentWithStyles;
