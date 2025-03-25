from flask import Flask, jsonify
from flask_cors import CORS
from nba_api.stats.endpoints import homepageleaders
from nba_api.stats.endpoints import homepagev2
from nba_api.stats.endpoints import leaguestandings
from nba_api.live.nba.endpoints import scoreboard

app = Flask(__name__)
cors = CORS(app, origins='*')


@app.route("/api/scores", methods=["GET"])
def scores():
    return (
        scoreboard.ScoreBoard().games.get_dict()
    )


@app.route("/api/dailystats<statId>", methods=["GET"])
def dailypointleaders(statId):
    # return (
    #     homepagev2.HomePageV2(
    #         game_scope_detailed="Yesterday", player_or_team="Player").home_page_stat1.get_dict()
    # )
    stats = getattr(homepagev2.HomePageV2(game_scope_detailed="Yesterday",
                    player_or_team="Player"), "home_page_stat" + statId).get_dict()
    return (stats)


@app.route("/api/standings", methods=["GET"])
def standings():
    return (
        leaguestandings.LeagueStandings().standings.get_dict()
    )


if __name__ == "__main__":
    app.run(debug=True, port=8080)
