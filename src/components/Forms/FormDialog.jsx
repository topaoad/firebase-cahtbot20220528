import React from "react";
import "./../../assets/styles/App.css";
import "./../../assets/styles/style.css";
import defaultDataset from "./../../dataset.js";
import { AnswersList, Chats, Title, TextInput } from "./../index";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      email: "",
      name: "",
    };

    //   //イベントハンドラとして関数を使うため、bindが必要な場合はこちら
    this.inputEmail = this.inputEmail.bind(this);
    this.inputName = this.inputName.bind(this);
    this.inputDescription = this.inputDescription.bind(this);
    this.submitForm = this.submitForm.bind(this)
    // propsで渡されているhandleClose関数を利用
    this.handleClose = this.props.handleClose.bind(this);
  }

  inputDescription = (event) => {
    this.setState({ description: event.target.value });
  };
  inputEmail = (event) => {
    this.setState({ email: event.target.value });
  };
  inputName = (event) => {
    this.setState({ name: event.target.value });
  };

  validateEmailFormat = (email) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return regex.test(email)
}

validateRequiredInput = (...args) => {
    let isBlank = false;
    for (let i = 0; i < args.length; i=(i+1)|0) {
        if (args[i] === "") {
            isBlank = true;
        }
    }
    return isBlank
};

  submitForm = () => {
    const name = this.state.name;
    const email = this.state.email;
    const description = this.state.description;

    const isBlank = this.validateRequiredInput(name, email, description)
    const isValidEmail = this.validateEmailFormat(email)

    if (isBlank) {
      alert('必須入力欄が空白です。')
      return false
  } else if (!isValidEmail) {
      alert('メールアドレスの書式が異なります。')
      return false
  } else {
      const payload = {
          text: 'お問い合わせがありました\n'
              + 'お名前: ' + name + '\n'
              + 'メールアドレス: ' + email + '\n'
              + '【問い合わせ内容】\n' + description
      };

      // const url = 'https://hooks.slack.com/services/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';

      // fetchメソッドでフォームの内容をSlackのIncoming Webhook URL に送信する
      fetch(url, {
          method: 'POST',
          body: JSON.stringify(payload)
      }).then(() => {
          alert('送信が完了しました。追ってご連絡いたします🙌');
          // 送信後、stateを初期化
          this.setState({
            description: "",
            email: "",
            name: "",

          })
          return this.handleClose()
      })
  }



  };


  render() {
    return (
      <div className="">
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">お問合せフォーム</DialogTitle>
          <DialogContent>
            <TextInput
              label={"名前(必須)"}
              multiline={false}
              rows={1}
              value={this.state.name}
              type={"text"}
              onChange={this.inputName}
            />
            <TextInput
              label={"メールアドレス(必須)"}
              multiline={false}
              rows={1}
              value={this.state.email}
              type={"email"}
              onChange={this.inputEmail }
            />
            <TextInput
              label={"お問い合わせ内容(必須)"}
              multiline={true}
              rows={5}
              value={this.state.description}
              type={"text"}
              onChange={this.inputDescription}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose}>キャンセル</Button>
            <Button onClick={this.submitForm} autoFocus>
              送信する
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
