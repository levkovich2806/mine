import * as React from 'react';
import './App.css';


interface MapClick {
  x: number,
  y: number
}


class App extends React.Component {
  state = {
    map: null
  }

  private socket: WebSocket = new WebSocket("wss://hometask.eg1236.com/game1/");

  componentDidMount() {
    this.socket.onopen = function () {
      console.log("Соединение установлено.");
    };

    this.socket.onclose = function (event: CloseEvent) {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения'); // например, "убит" процесс сервера
      }
      console.log('Код: ' + event.code + ' причина: ' + event.reason);
    };

    this.socket.onmessage = function (event: MessageEvent) {
      // const data: any = JSON.parse(event.data);
      console.log("Получены данные " + event.data);
    };

    this.socket.onerror = function (error: any) {
      console.log("Ошибка " + error.message);
    };
  }

  handleGetHelp = () => {
    this.socket.send("help");
  }

  handleNewLevel = (level: number) => {
    this.socket.send(`new ${level}`);
  }

  handleGetMap = () => {
    this.socket.send("map");
  }

  handleClick = ({x, y}: MapClick) => {
    this.socket.send(`open ${x} ${y}`);
  }

  public render() {
    return (
      <div className="App">
        <button onClick={this.handleGetHelp}>Help</button>
        <button onClick={() => this.handleNewLevel(1)}>New 1</button>
        <button onClick={() => this.handleNewLevel(2)}>New 2</button>
        <button onClick={() => this.handleNewLevel(3)}>New 3</button>
        <button onClick={() => this.handleNewLevel(4)}>New 4</button>
        <button onClick={this.handleGetMap}>Map</button>
        <button onClick={() => this.handleClick({x: 2, y: 3})}>Click 2x3</button>
      </div>
    );
  }
}

export default App;
