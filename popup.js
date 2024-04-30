let firstscorecardcopy = document.getElementById("firstscorecardcopy");
let firstscorecardpaste = document.getElementById("firstscorecardpaste");
let secondscorecardcopy = document.getElementById("secondscorecardcopy");
let secondscorecardpaste = document.getElementById("secondscorecardpaste");
let mvpcopy = document.getElementById("mvpcopy");
let mvppaste = document.getElementById("mvppaste");
let commentarycopy = document.getElementById("commentarycopy");
let commentarypaste = document.getElementById("commentarypaste");
let cleardetail = document.getElementById("clearit");

/**
 * First Innings Copy Event Handling
 */
firstscorecardcopy.addEventListener("click", async () => {
  // Get current active Tab of browser
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (tab.url.includes("/full-scorecard")) {
    //Executing script on the page !!
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: scrapeFirstInningMatchScoreCard,
    });
  } else {
    alert("Not on Scorecard Page, kindly select valid page");
  }
});

/**
 * First Innings Paste Event Handling
 */
firstscorecardpaste.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: pasteFirstInningMatchScoreCard,
  });
});

/**
 * Second Innings Copy Event Handling
 */
secondscorecardcopy.addEventListener("click", async () => {
  // Get current active Tab of browser
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (tab.url.includes("/full-scorecard")) {
    //Executing script on the page !!
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: scrapeSecondInningMatchScoreCard,
    });
  } else {
    alert("Not on Scorecard Page, kindly select valid page");
  }
});

/**
 * Second Innings Copy Event Handling
 */
secondscorecardpaste.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: pasteSecondInningMatchScoreCard,
  });
});

/**
 * MVP Copy Event Handling
 */
mvpcopy.addEventListener("click", async () => {
  // Get current active Tab of browser
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  if (tab.url.includes("/match-impact-player")) {
    //Executing script on the page !!
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: scrapeMatchMVP,
    });
  } else {
    alert("Not on Player MVP Page, kindly select valid page");
  }
});

/**
 * MVP Paste Event Handling
 */
mvppaste.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: pasteMatchMVP,
  });
});

/**
 * Commentary Copy Event Handling
 */

commentarycopy.addEventListener("click", async () => {
  // Get current active Tab of browser
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  if (tab.url.includes("/ball-by-ball-commentary")) {
    //Executing script on the page !!
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: scrapeMatchCommentary,
    });
  } else {
    alert("Not on Commantary Page, kindly select valid page");
  }
});

/**
 * Commentary Paste Event Handling
 */
commentarypaste.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: pasteMatchCommentary,
  });
});

/**
 * Clear data from chrome storage
 */

cleardetail.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: clearAllEntriesFromStorage,
  });
});

/**
 * Handler to copy match of first innings from site
 */
const scrapeFirstInningMatchScoreCard = async () => {
  let firstInningsScore = {
    batting: [],
    bowling: [],
  };
  let firstInnings = document.querySelectorAll(".ds-rounded-lg.ds-mt-2")[0];
  let firstInningsBatting = firstInnings.querySelectorAll(".ds-p-0 > table")[0];
  let allPlayersBattingStats = [];
  firstInningsBatting.querySelectorAll("tbody > tr").forEach((ele, index) => {
    if (ele.childElementCount === 8) {
      let battingPlayerStats = {};
      battingPlayerStats["playerName"] = ele.children[0].textContent;
      battingPlayerStats["howWasOut"] = ele.children[1].textContent;
      battingPlayerStats["runs"] = isNaN(ele.children[2].textContent)
        ? -1000
        : Number(ele.children[2].textContent);
      battingPlayerStats["balls"] = isNaN(ele.children[3].textContent)
        ? -1000
        : Number(ele.children[3].textContent);
      battingPlayerStats["minutes"] = isNaN(ele.children[4].textContent)
        ? -1000
        : Number(ele.children[4].textContent);
      battingPlayerStats["fours"] = isNaN(ele.children[5].textContent)
        ? -1000
        : Number(ele.children[5].textContent);
      battingPlayerStats["sixes"] = isNaN(ele.children[6].textContent)
        ? -1000
        : Number(ele.children[6].textContent);
      battingPlayerStats["strikeRate"] = isNaN(ele.children[7].textContent)
        ? -1000
        : Number(ele.children[7].textContent);
      allPlayersBattingStats.push(battingPlayerStats);
    }
  });
  let firstInningsBowling = firstInnings.querySelectorAll(".ds-p-0 > table")[1];
  let allPlayersBowlingStats = [];
  firstInningsBowling.querySelectorAll("tbody > tr").forEach((ele, index) => {
    if (ele.childElementCount === 11) {
      let bowlingPlayerStats = {};
      bowlingPlayerStats["playerName"] = ele.children[0].textContent;
      bowlingPlayerStats["overs"] = isNaN(ele.children[1].textContent)
        ? -1000
        : Number(ele.children[1].textContent);
      bowlingPlayerStats["maidens"] = isNaN(ele.children[2].textContent)
        ? -1000
        : Number(ele.children[2].textContent);
      bowlingPlayerStats["runs"] = isNaN(ele.children[3].textContent)
        ? -1000
        : Number(ele.children[3].textContent);
      bowlingPlayerStats["wickets"] = isNaN(ele.children[4].textContent)
        ? -1000
        : Number(ele.children[4].textContent);
      bowlingPlayerStats["econ"] = isNaN(ele.children[5].textContent)
        ? -1000
        : Number(ele.children[5].textContent);
      bowlingPlayerStats["zeros"] = isNaN(ele.children[6].textContent)
        ? -1000
        : Number(ele.children[6].textContent);
      bowlingPlayerStats["fours"] = isNaN(ele.children[7].textContent)
        ? -1000
        : Number(ele.children[7].textContent);
      bowlingPlayerStats["sixes"] = isNaN(ele.children[8].textContent)
        ? -1000
        : Number(ele.children[8].textContent);
      bowlingPlayerStats["wides"] = isNaN(ele.children[9].textContent)
        ? -1000
        : Number(ele.children[9].textContent);
      bowlingPlayerStats["noballs"] = isNaN(ele.children[10].textContent)
        ? -1000
        : Number(ele.children[10].textContent);
      allPlayersBowlingStats.push(bowlingPlayerStats);
    }
  });
  firstInningsScore["batting"] = allPlayersBattingStats;
  firstInningsScore["bowling"] = allPlayersBowlingStats;
  let storedValueFirstInnings = await chrome.storage.local.set({
    match_first_innings: JSON.stringify(firstInningsScore),
  });
  setTimeout(() => {
    console.log("First Inning Data Stored !!");
  }, 3000);
};

/**
 * Handler to paste match of first innings from site
 */
const pasteFirstInningMatchScoreCard = async () => {
  let fetchedValue = await chrome.storage.local.get("match_first_innings");
  document.getElementById("first_innings_jsondata").value = "";
  document.getElementById("first_innings_jsondata").value =
    fetchedValue.match_first_innings;
  console.log("First Inning Data Pasted !!");
};

/**
 * Handler to copy match of second innings from site
 */
const scrapeSecondInningMatchScoreCard = async () => {
  let secondInningsScore = {
    batting: [],
    bowling: [],
  };
  let secondInnings = document.querySelectorAll(".ds-rounded-lg.ds-mt-2")[1];
  let secondInningsBatting =
    secondInnings.querySelectorAll(".ds-p-0 > table")[0];
  let allPlayersBattingStats = [];
  secondInningsBatting.querySelectorAll("tbody > tr").forEach((ele, index) => {
    if (ele.childElementCount === 8) {
      let battingPlayerStats = {};
      battingPlayerStats["playerName"] = ele.children[0].textContent;
      battingPlayerStats["howWasOut"] = ele.children[1].textContent;
      battingPlayerStats["runs"] = isNaN(ele.children[2].textContent)
        ? -1000
        : Number(ele.children[2].textContent);
      battingPlayerStats["balls"] = isNaN(ele.children[3].textContent)
        ? -1000
        : Number(ele.children[3].textContent);
      battingPlayerStats["minutes"] = isNaN(ele.children[4].textContent)
        ? -1000
        : Number(ele.children[4].textContent);
      battingPlayerStats["fours"] = isNaN(ele.children[5].textContent)
        ? -1000
        : Number(ele.children[5].textContent);
      battingPlayerStats["sixes"] = isNaN(ele.children[6].textContent)
        ? -1000
        : Number(ele.children[6].textContent);
      battingPlayerStats["strikeRate"] = isNaN(ele.children[7].textContent)
        ? -1000
        : Number(ele.children[7].textContent);
      allPlayersBattingStats.push(battingPlayerStats);
    }
  });
  let secondInningsBowling =
    secondInnings.querySelectorAll(".ds-p-0 > table")[1];
  let allPlayersBowlingStats = [];
  secondInningsBowling.querySelectorAll("tbody > tr").forEach((ele, index) => {
    if (ele.childElementCount === 11) {
      let bowlingPlayerStats = {};
      bowlingPlayerStats["playerName"] = ele.children[0].textContent;
      bowlingPlayerStats["overs"] = isNaN(ele.children[1].textContent)
        ? -1000
        : Number(ele.children[1].textContent);
      bowlingPlayerStats["maidens"] = isNaN(ele.children[2].textContent)
        ? -1000
        : Number(ele.children[2].textContent);
      bowlingPlayerStats["runs"] = isNaN(ele.children[3].textContent)
        ? -1000
        : Number(ele.children[3].textContent);
      bowlingPlayerStats["wickets"] = isNaN(ele.children[4].textContent)
        ? -1000
        : Number(ele.children[4].textContent);
      bowlingPlayerStats["econ"] = isNaN(ele.children[5].textContent)
        ? -1000
        : Number(ele.children[5].textContent);
      bowlingPlayerStats["zeros"] = isNaN(ele.children[6].textContent)
        ? -1000
        : Number(ele.children[6].textContent);
      bowlingPlayerStats["fours"] = isNaN(ele.children[7].textContent)
        ? -1000
        : Number(ele.children[7].textContent);
      bowlingPlayerStats["sixes"] = isNaN(ele.children[8].textContent)
        ? -1000
        : Number(ele.children[8].textContent);
      bowlingPlayerStats["wides"] = isNaN(ele.children[9].textContent)
        ? -1000
        : Number(ele.children[9].textContent);
      bowlingPlayerStats["noballs"] = isNaN(ele.children[10].textContent)
        ? -1000
        : Number(ele.children[10].textContent);
      allPlayersBowlingStats.push(bowlingPlayerStats);
    }
  });
  secondInningsScore["batting"] = allPlayersBattingStats;
  secondInningsScore["bowling"] = allPlayersBowlingStats;
  let storedValueSecondInnings = await chrome.storage.local.set({
    match_second_innings: JSON.stringify(secondInningsScore),
  });
  setTimeout(() => {
    console.log("Second Inning Data Stored !!");
  }, 3000);
};

/**
 * Handler to paste match of second innings from site
 */
const pasteSecondInningMatchScoreCard = async () => {
  let fetchedValue = await chrome.storage.local.get("match_second_innings");
  document.getElementById("second_innings_jsondata").value = "";
  document.getElementById("second_innings_jsondata").value =
    fetchedValue.match_second_innings;
  console.log("Second Inning Data Pasted !!");
};

/**
 * Handler to copy match MVP from site
 */

const scrapeMatchMVP = async () => {
  let mvpAllData = [];
  document
    .querySelectorAll(
      "table.ds-w-full.ds-table.ds-table-md.ds-table-auto > tbody > tr"
    )
    .forEach((ele, ind) => {
      let mvpOfPlayer = {};
      let tdElements = ele.querySelectorAll("td");
      let runAndBall = tdElements[3].textContent
        .replace("(", " ")
        .replace(")", "")
        .split(" ");
      let ballAndWicket = tdElements[6].textContent
        .replace("/", " ")
        .split(" ");
      mvpOfPlayer["name"] = tdElements[0].textContent;
      mvpOfPlayer["country"] = tdElements[1].textContent;
      mvpOfPlayer["totalImpact"] = Number(
        tdElements[2].textContent.replaceAll(" ", "")
      );
      mvpOfPlayer["run"] =
        runAndBall.length === 2
          ? Number(runAndBall[0].replaceAll(" ", ""))
          : -1000;
      mvpOfPlayer["ballPlayed"] =
        runAndBall.length === 2
          ? Number(runAndBall[1].replaceAll(" ", ""))
          : -1000;
      mvpOfPlayer["impactRun"] = !isNaN(
        tdElements[4].textContent.replaceAll(" ", "")
      )
        ? Number(tdElements[4].textContent.replaceAll(" ", ""))
        : -1000;
      mvpOfPlayer["runOnBalls"] =
        ballAndWicket.length === 2 ? Number(ballAndWicket[1]) : -1000;
      mvpOfPlayer["wickets"] =
        ballAndWicket.length === 2 ? Number(ballAndWicket[0]) : -1000;
      mvpOfPlayer["impactWicket"] = !isNaN(
        tdElements[7].textContent.replaceAll(" ", "")
      )
        ? Number(tdElements[7].textContent.replaceAll(" ", ""))
        : -1000;
      mvpAllData.push(mvpOfPlayer);
    });
  let storedValueMVP = await chrome.storage.local.set({
    match_mvp: JSON.stringify(mvpAllData),
  });
  setTimeout(() => {
    console.log("MVP Data Stored !!");
  }, 3000);
};

/**
 * Handler to paste match MVP from site
 */

const pasteMatchMVP = async () => {
  let fetchedValue = await chrome.storage.local.get("match_mvp");
  document.getElementById("mvpjsondata").value = "";
  document.getElementById("mvpjsondata").value = fetchedValue.match_mvp;
  console.log("MVP Data pasted !!");
};

/**
 * Handler to copy match commentary from site
 */
const scrapeMatchCommentary = async () => {
  let allData = [];
  const wideRegex = new RegExp("(wide$|leg bye$)");
  const noRunRegex = new RegExp("no run$");
  const outRegex = new RegExp("OUT$");
  const boundaryRegex = new RegExp("(SIX|FOUR) runs$");
  document
    .querySelectorAll("div.ds-hover-parent.ds-relative")
    .forEach((ele, ind) => {
      if (
        ele.childElementCount === 1 &&
        !!ele.querySelector("p.ci-html-content")
      ) {
        let overText = ele.children[0].children[0]
          .getElementsByTagName("span")[0]
          .textContent.split(".");
        let runsText =
          ele.children[0].children[0].getElementsByTagName("span")[1]
            .textContent;
        let quickText =
          ele.children[0].children[1].children[0].children[0].getElementsByTagName(
            "span"
          )[0].textContent;
        let ballcommentary =
          ele?.children[0]?.children[1]?.children[0]?.children[0]?.getElementsByClassName(
            "ci-html-content"
          )[0]?.textContent;

        let containsExtra = wideRegex.test(quickText) ? true : false;
        let containsWicket = outRegex.test(quickText) ? true : false;
        let containsBoundary = boundaryRegex.test(quickText) ? true : false;
        let dotBall = noRunRegex.test(quickText) ? true : false;
        let ballByBall = {};
        ballByBall["over"] = overText[0];
        ballByBall["ball"] = overText[1];
        ballByBall["who_to_who"] = quickText;
        ballByBall["batsman"] = quickText.split(",")[0].split(" to ")[1];
        ballByBall["bowler"] = quickText.split(",")[0].split(" to ")[0];
        ballByBall["ballcommentary"] = ballcommentary;
        ballByBall["iswicket"] = containsWicket;
        ballByBall["isboundary"] = containsBoundary;
        ballByBall["isExtraRun"] = containsExtra;
        ballByBall["runscored"] = containsWicket
          ? 0
          : dotBall
          ? 0
          : parseInt(runsText);
        ballByBall["battingteam"] = "";
        ballByBall["match_fk"] = "";
        ballByBall["innings"] = "";
        allData.push(ballByBall);
      }
    });
  console.log(allData);
  // let storedValue = await chrome.storage.local.set({
  //   match_commantary: JSON.stringify(allData),
  // });
  // setTimeout(() => {
  //   console.log("Commentary Data Stored !!");
  // }, 3000);
};

/**
 * Handler to paste match commentary from site
 */
const pasteMatchCommentary = async () => {
  let fetchedValue = await chrome.storage.local.get("match_commantary");
  document.getElementById("jsondata").value = "";
  document.getElementById("jsondata").value = fetchedValue.match_commantary;
};

/**
 * Handler to clear all the entries from chrome storage.
 */
const clearAllEntriesFromStorage = async () => {
  await chrome.storage.local.set({
    match_commantary: "",
  });
  await chrome.storage.local.set({
    match_mvp: "",
  });
  await chrome.storage.local.set({
    match_second_innings: "",
  });
  await chrome.storage.local.set({
    match_first_innings: "",
  });
  setTimeout(() => {
    console.log("Data Cleared !!");
  }, 3000);
};
