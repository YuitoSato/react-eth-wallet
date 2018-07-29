import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/es/Card/Card';
import CardContent from '@material-ui/core/es/CardContent/CardContent';
import Typography from '@material-ui/core/es/Typography/Typography';
import CardActions from '@material-ui/core/es/CardActions/CardActions';
import Button from '@material-ui/core/es/Button/Button';
import withStyles from '@material-ui/core/es/styles/withStyles';
import FormControl from '@material-ui/core/es/FormControl/FormControl';
import InputLabel from '@material-ui/core/es/InputLabel/InputLabel';
import Select from '@material-ui/core/es/Select/Select';
import MenuItem from '@material-ui/core/es/MenuItem/MenuItem';
import { fetchAccounts } from '../actions/accountAction';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/es/TextField/TextField';
import { sendToken } from '../actions/sendTokenAction';

const styles = {
  card: {
    marginTop: 20,
    marginLeft: 20,
    minWidth: 275,
    maxWidth: 700,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};


class SendTokenForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromAddress: '',
      toAddress: '',
      amount: 0,
      password: '',
    };
  }

  componentDidMount() {
    const {fetchAccounts, web3 } = this.props;
    fetchAccounts(web3);
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleSubmit(event) {
    event.preventDefault();
    const { toAddress, fromAddress, amount, password } = this.state;
    console.log(password);
    const { web3, sendToken } = this.props;
    sendToken(web3, toAddress, fromAddress, amount, password);

    this.setState({
      fromAddress: '',
      toAddress: '',
      amount: 0,
      password: ''
    });
  }

  render() {
    const {classes, loadAccountsError, isLoading, accounts, isSending} = this.props;

    if (loadAccountsError) {
      return (<p>
        error
      </p>);
    }

    if (isLoading || isSending) {
      return (<p>
        loading...
      </p>)
    }

    return (
      <div>
        <Card className={classes.card}>
          <form className={classes.root} autoComplete="off" onSubmit={this.handleSubmit.bind(this)}>
            <CardContent>
              <Typography variant="headline" component="h2">
                Token Form
              </Typography>
              {/*サボり*/}
              <br />
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="from">From</InputLabel>
                <Select
                  value={this.state.fromAddress}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'fromAddress',
                  }}
                >
                  {accounts.map((account, i) => (
                    <MenuItem
                      key={i + 1}
                      value={account.address}>{account.address}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="to">To</InputLabel>
                <Select
                  value={this.state.toAddress}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'toAddress',
                  }}
                >
                  {accounts.map((account, i) => (
                    <MenuItem
                      key={i}
                      value={account.address}>{account.address}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <FormControl className={classes.formControl}>
                <TextField
                  id="amount"
                  label="amount"
                  value={this.state.amount}
                  onChange={this.handleChange}
                  type="number"
                  inputProps={{
                    name: 'amount',
                  }}
                  margin="normal"
                />
              </FormControl>
              <br />
              <FormControl className={classes.formControl}>
                <TextField
                  id="password"
                  label="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                  inputProps={{
                    name: 'password',
                  }}
                  margin="normal"
                />
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                size="small" type="submit"
              >
                SUBMIT
              </Button>
            </CardActions>
          </form>

        </Card>
      </div>
    );
  }
}

SendTokenForm.propTypes = {
  web3: PropTypes.any.isRequired,
  fetchAccounts: PropTypes.func.isRequired,
  accounts: PropTypes.array.isRequired,
  loadAccountsError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isSending: PropTypes.bool.isRequired,
  sendTokenError: PropTypes.bool.isRequired,
  sendToken: PropTypes.func.isRequired,
  lastTransactionHash: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  accounts: state.accounts,
  loadAccountsError: state.fetchAccountsError,
  isLoading: state.loadAccounts,
  isSending: state.sendingToken,
  sendTokenError: state.sendFailure,
  lastTransactionHash: state.lastTransactionHash
});

const mapDispatchToProps = dispatch => ({
  fetchAccounts: (web3) => dispatch(fetchAccounts(web3)),
  sendToken: (web3, to, from, amount, password) => dispatch(sendToken(web3, to, from, amount, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SendTokenForm));
