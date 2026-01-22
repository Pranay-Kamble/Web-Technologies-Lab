const logHistory = [];

let lastClickTime = 0;
let clickBurstCount = 0;

const getLogForEvent = (evt, type) => {
  return {
    id: logHistory.length + 1,
    type: type,
    target: evt.target.tagName + (evt.target.id ? `#${evt.target.id}` : ""),
    time: new Date().toLocaleTimeString(),
  };
};

const getLogDiv = (log) => {
  const newLog = document.createElement("div");
  newLog.setAttribute("id", `${String(log.id) + "_" + log.target}`);
  newLog.innerText = `ID: ${log.id}, Time: ${log.time}, Type: ${log.type}, Target: ${log.target}`;

  return newLog;
};

const renderLogs = () => {
  if (logHistory.length === 0) {
    document.querySelector('#log-display-container').innerHTML = "<h2>Logs Display</h2>"
    return
  }
  const parentElement = document.querySelector("#log-display-container").querySelector('h2');
  const logDisplayElement = getLogDiv(logHistory[0]);
  parentElement.insertAdjacentElement('afterend', logDisplayElement);
};

document.addEventListener("click", (evt) => {
  if (
    evt.target.id &&
    (evt.target.id === "reset-button" || evt.target.id === "export-button")
  )
    return;

  const now = Date.now();
  if (now - lastClickTime < 200) {
    clickBurstCount++;
  } else {
    clickBurstCount = 0;
  }
  lastClickTime = now;

  if (clickBurstCount > 5) {
    alert("Suspicious Activity: Too many clicks!");
    clickBurstCount = 0;
  }

  const log = getLogForEvent(evt, "Click");
  logHistory.unshift(log);
  renderLogs();
});

document.addEventListener("keydown", (evt) => {
  const log = getLogForEvent(evt, "Keydown");
  logHistory.unshift(log);
  renderLogs();
});

document.addEventListener("focus", (evt) => {
  const log = getLogForEvent(evt, "Focus");
  logHistory.unshift(log);
  renderLogs()
}, { capture: true });

document.querySelector("#reset-button").addEventListener("click", (evt) => {
    console.log(logHistory)
  if (logHistory.length === 0) {
    alert("No Log History recorded");
    return;
  }

  logHistory.length = 0;
  renderLogs();
});

document.querySelector("#export-button").addEventListener("click", (evt) => {
  if (!logHistory.length) {
    alert("No Log History recorded");
    return;
  }
  console.log(logHistory);
  alert(
    "Log History JSON is written to console (please expand the arrow to view each log). Open Dev Tools.",
  );
});
