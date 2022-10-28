import { useState } from "react";
import useWebSocket from "react-use-websocket";
import "./App.css";
import BlocoN from "./assets/bloco-n.jpeg";
function App() {
  const [vagas, setVagas] = useState([]);
  const { lastJsonMessage, sendMessage } = useWebSocket(
    "ws://kalinski-tcc.fly.dev/",
    {
      onOpen: () => console.log(`Connected to App WS`),
      onMessage: () => {
        if (lastJsonMessage) {
          setVagas(lastJsonMessage);
          console.log(lastJsonMessage);
        }
      },
      onError: (event) => {
        console.error(event);
      },
      shouldReconnect: (closeEvent) => true,
      reconnectInterval: 3000,
    }
  );

  return (
    <div className="container-fluid">
      <img src={BlocoN} className="estacionamento" />

      <div class="row">
        {vagas?.map((el, index) => {
          const statusColor = el.status == "1" ? "btn-danger" : "btn-success";
          return (
            <div>
              <button
                className={`btn ${statusColor} btn-${el.id}`}
                key={el.id}
              ></button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
