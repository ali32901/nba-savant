from flask import Flask, jsonify
from flask_cors import CORS
from datetime import date

from nba_api.stats.endpoints import leaguestandings
from nba_api.stats.endpoints import leaguegamelog
from nba_api.stats.endpoints import commonplayerinfo
from nba_api.stats.endpoints import playercareerstats

from nba_api.live.nba.endpoints import scoreboard

app = Flask(__name__)
cors = CORS(app, origins='*')


@app.route("/scores", methods=["GET"])
def scores():
    return (
        scoreboard.ScoreBoard().games.get_dict()
    )


@app.route("/boxscore", methods=["GET"])
def boxscore():
    return (
        boxscore.BoxScore
    )


@app.route("/dailystats<sorter>", methods=["GET"])
def dailystats(sorter):
    return leaguegamelog.LeagueGameLog(
        player_or_team_abbreviation="P", sorter=sorter, date_from_nullable=date.today(), direction="DESC").league_game_log.get_dict()


@app.route("/standings", methods=["GET"])
def standings():
    return (
        leaguestandings.LeagueStandings().standings.get_dict()
    )


@app.route("/playerbio/<id>", methods=["GET"])
def playerbio(id):
    return (
        commonplayerinfo.CommonPlayerInfo(
            player_id=id).common_player_info.get_dict()
    )


@app.route("/careerstats/<id>", methods=["GET"])
def careerstats(id):
    return (
        playercareerstats.PlayerCareerStats(
            player_id=id).season_totals_regular_season.get_dict()
    )


if __name__ == "__main__":
    app.run(debug=True, port=8080)
