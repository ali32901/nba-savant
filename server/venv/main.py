from flask import Flask, jsonify
from flask_cors import CORS

from nba_api.stats.endpoints import homepagev2
from nba_api.stats.endpoints import leaguestandings
from nba_api.live.nba.endpoints import scoreboard
from nba_api.stats.endpoints import leaguegamelog

app = Flask(__name__)
cors = CORS(app, origins='*')

foo = leaguegamelog.LeagueGameLog(
    player_or_team_abbreviation="P", date_from_nullable="2025-03-26", sorter="PTS", direction="DESC").league_game_log.get_dict()

scores = scoreboard.ScoreBoard()
games = scores.games.get_dict()


@app.route("/api/scores", methods=["GET"])
def scores():
    return (
        scoreboard.ScoreBoard().games.get_dict()
    )


@app.route("/api/dailystats<sorter>/<date>", methods=["GET"])
def dailystats(sorter, date):
    # stats = getattr(homepagev2.HomePageV2(game_scope_detailed="Yesterday",
    #                 player_or_team="Player"), "home_page_stat" + statId).get_dict()
    # return (stats)
    return leaguegamelog.LeagueGameLog(
        player_or_team_abbreviation="P", date_from_nullable=date, sorter=sorter, direction="DESC").league_game_log.get_dict()


@app.route("/api/standings", methods=["GET"])
def standings():
    return (
        leaguestandings.LeagueStandings().standings.get_dict()
    )


if __name__ == "__main__":
    app.run(debug=True, port=8080)
