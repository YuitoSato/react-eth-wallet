import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/es/styles/withStyles';
import Web3 from 'web3';
import { fetchAccounts } from '../actions/accountAction';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class AccountBalanceBoard extends Component {
  constructor(props) {
    super(props);
    this.web3 = new Web3();
    this.web3.setProvider(new this.web3.providers.HttpProvider("http://localhost:8545"));

    // NOTE yuito
    // https://github.com/coopermaruyama/react-web3/issues/25
    // windowのweb3を塗り替える。
    if (window.web3) {
      window.web3 = this.web3;
    }
  }

  componentDidMount() {
    this.props.fetchAccounts(this.web3);
  }

  render() {
    const {classes} = this.props;

    if (this.props.hasError) {
      return (<p>
        error
      </p>);
    }

    if (this.props.isLoading) {
      return (<p>
        loading...
      </p>)
    }

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell>Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.accounts.map((account, i) => (
              <TableRow key={i}>
                <TableCell>
                  {account.address}
                </TableCell>
                <TableCell>{account.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}


AccountBalanceBoard.propTypes = {
  fetchAccounts: PropTypes.func.isRequired,
  accounts: PropTypes.array.isRequired,
  hasError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  accounts: state.accounts,
  hasError: state.fetchAccountsError,
  isLoading: state.loadAccounts
});

const mapDispatchToProps = dispatch => ({
  fetchAccounts: (web3) => dispatch(fetchAccounts(web3))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountBalanceBoard));
