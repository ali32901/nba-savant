from flask import Flask, jsonify
from flask_cors import CORS
from datetime import date

from nba_api.stats.endpoints import homepagev2
from nba_api.stats.endpoints import leaguestandings
from nba_api.stats.endpoints import leaguegamelog
from nba_api.stats.endpoints import playerdashboardbygeneralsplits
from nba_api.stats.endpoints import commonplayerinfo

from nba_api.live.nba.endpoints import scoreboard
app = Flask(__name__)
cors = CORS(app, origins='*')


@app.route("/api/scores", methods=["GET"])
def scores():
    return (
        scoreboard.ScoreBoard().games.get_dict()
    )


@app.route("/api/dailystats<sorter>", methods=["GET"])
def dailystats(sorter):
    return leaguegamelog.LeagueGameLog(
        player_or_team_abbreviation="P", sorter=sorter, date_from_nullable=date.today(), direction="DESC").league_game_log.get_dict()


@app.route("/api/standings", methods=["GET"])
def standings():
    return (
        leaguestandings.LeagueStandings().standings.get_dict()
    )


@app.route("/api/player/<id>", methods=["GET"])
def player(id):
    return (
        playerdashboardbygeneralsplits.PlayerDashboardByGeneralSplits(
            player_id=id).overall_player_dashboard.get_dict()
    )


@app.route("/api/playerbio/<id>", methods=["GET"])
def playerbio(id):
    return (
        commonplayerinfo.CommonPlayerInfo(
            player_id=id).common_player_info.get_dict()
    )


if __name__ == "__main__":
    app.run(debug=True, port=8080)
