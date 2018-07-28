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

let id = 0;

function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return {id, name, calories, fat, carbs, protein};
}

const data = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

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

    this.state = {
      accounts: ['aaa'],
      blockNumber: 0,
      loading: true
    };
  }

  componentWillMount() {
    this.load();
  }

  load() {
    // const blockNumber = this.web3.eth.getBlockNumber().catch(e => e);
    //
    // if (!blockNumber) {
    //   console.log("やばい");
    //   return;
    // }

    this.web3.eth.getBlockNumber((e, r) => {
      if (e) {
        console.log(e);
      }
      console.log(r);
      const newState = Object.assign({}, this.state, {
        accounts: ['bbb'],
        blockNumber: r,
        loading: false
      });
      this.setState(newState);
    });

    // const accounts = await this.web3.eth.getAccounts(function(e, r) {
    //   if(!e) {
    //     console.log(r);
    //     return r;
    //   } else {
    //     console.log('やばいい');
    //   }
    // });
    // console.log(accounts);
    // if (accounts instanceof Error || accounts == null) {
    //   console.log('やばい');
    //   return;
    // }

    // const accounts = this.web3.eth.getAccounts(function (e, r) {
    //   if (!e) {
    //     console.log(r);
    //     return r;
    //   } else {
    //     console.log('やばいい');
    //   }
    // });
    // console.log(accounts)
    //
  }

  render() {
    const {classes} = this.props;

    if (this.state.loading) {
      return (<div>
        ロード中
      </div>);
    } else {
      return (
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell numeric>Calories</TableCell>
                <TableCell numeric>Fat (g)</TableCell>
                <TableCell numeric>Carbs (g)</TableCell>
                <TableCell numeric>Protein (g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.accounts.map((account, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {account}
                  </TableCell>
                  <TableCell numeric>{this.state.blockNumber}</TableCell>
                  <TableCell numeric>あああ</TableCell>
                  <TableCell numeric>いいい</TableCell>
                  <TableCell numeric>ううう</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )
    }

  }
}


// AccountBalanceBoard.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(AccountBalanceBoard);
