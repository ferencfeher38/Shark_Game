async function main() {
  const leaderboardObj = new Leaderboard();

  const initName = window.sessionStorage.getItem("name");
  const initScore = window.sessionStorage.getItem("score");
  console.log(initName);
  console.log(initScore);

  if (initName && initScore) {
    await leaderboardObj.add(initName, initScore);
    console.log("lefutott");
  }

  window.sessionStorage.removeItem("name");
  window.sessionStorage.removeItem("score");

  const scores = await leaderboardObj.getAll();
  scores.sort((a, b) => b.score - a.score);
  document.getElementById("laderboardList").innerHTML = scores
    .map(
      (data) =>
        '<li class="listItem"><div class="nameContainer">' +
        data.name +
        '</div><div class="scoreContainer">' +
        data.score +
        "</div></li>"
    )
    .join("<hr />");
}

class Leaderboard {
  leaderboardRef = db.collection("Leaderboard");

  async add(name, score) {
    const player = { name, score };

    try {
      const docRef = await this.leaderboardRef.add(player);
      player.id = docRef.id;
    } catch (error) {
      console.error("Error adding score: ", error);
    }

    return score;
  }

  async getAll() {
    const scores = [];

    try {
      const snapshot = await this.leaderboardRef.get();
      snapshot.forEach((doc) => scores.push({ id: doc.id, ...doc.data() }));
    } catch (err) {
      console.error("Error getting scores: ", error);
    }

    return scores;
  }
}

main();
