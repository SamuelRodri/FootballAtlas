# Domain Model

## Country

Represents a geographic country.

Relationships:

* Has national teams
* Has clubs
* Is the birthplace of players

## National Team

Represents a football national team.

Relationships:

* Belongs to a country
* Contains players

## Club

Represents a football club.

Relationships:

* Belongs to a country
* Has players

## Player

Represents a football player.

Relationships:

* Has a birth country
* Plays for a club
* May represent a national team
