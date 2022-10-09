import "./App.css";
import useWebSocket from "react-use-websocket";
import { useState } from "react";

function App() {
  const [vagas, setVagas] = useState([]);
  const { lastJsonMessage, sendMessage } = useWebSocket("ws://localhost:8080", {
    onOpen: () => console.log(`Connected to App WS`),
    onMessage: () => {
      if (lastJsonMessage) {
        setVagas(lastJsonMessage);
        console.log(lastJsonMessage);
      }
    },
    queryParams: { token: "123456" },
    onError: (event) => {
      console.error(event);
    },
    shouldReconnect: (closeEvent) => true,
    reconnectInterval: 3000,
  });

  return (
    <div className="container-fluid">
      <div class="card mt-2">
        <div class="card-body">
          <div class="row">
            {vagas?.map((el) => {
              const statusColor = el.status
                ? "border-danger bg-danger"
                : "border-success bg-success";

              return (
                <div
                  class={`p-2 col-sm-2 card card-vagas ${statusColor} text-center`}
                  key={el.id}
                >
                  <b>Vaga Nº{el.id}</b>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
