from flask import Flask, jsonify
from flask_cors import CORS
from datetime import date

from nba_api.stats.endpoints import leaguestandings
from nba_api.stats.endpoints import leaguegamelog
from nba_api.stats.endpoints import leagueleaders
from nba_api.stats.endpoints import commonplayerinfo
from nba_api.stats.endpoints import playercareerstats
from nba_api.stats.endpoints import commonallplayers
from nba_api.stats.endpoints import playerdashboardbyshootingsplits

from nba_api.live.nba.endpoints import scoreboard

app = Flask(__name__)
cors = CORS(app, origins='*')


@app.route("/scores", methods=["GET"])
def scores():
    return (
        scoreboard.ScoreBoard().games.get_dict()
    )


@app.route("/leaders<seasonType>", methods=["GET"])
def leaders(seasonType):
    return leaguegamelog.LeagueGameLog(
        player_or_team_abbreviation="P", season_type_all_star=seasonType, direction="DESC").league_game_log.get_dict()


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


@app.route("/activeplayers", methods=["GET"])
def activeplayers():
    return (
        commonallplayers.CommonAllPlayers(
            is_only_current_season=1).common_all_players.get_dict()
    )


@app.route("/playersplits/<id>", methods=["GET"])
def playersplits(id):
    return (
        playerdashboardbyshootingsplits.PlayerDashboardByShootingSplits(
            player_id=id).get_dict()
    )


@app.route("/leaguestats/<year>", methods=["GET"])
def leaguestats(year):
    return (
        leagueleaders.LeagueLeaders(
            season=year, per_mode48="PerGame").league_leaders.get_dict()
    )


@app.route("/leaguestatsall/", methods=["GET"])
def leaguestatsall(year):
    return (
        leagueleaders.LeagueLeaders(
            per_mode48="PerGame").league_leaders.get_dict()
    )


if __name__ == "__main__":
    app.run(debug=True, port=8080)
