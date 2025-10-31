<?php

declare(strict_types=1);

namespace Bga\Games\itaren\States;

use Bga\GameFramework\StateType;
use Bga\GameFramework\States\GameState;
use Bga\GameFramework\States\PossibleAction;
use Bga\Games\itaren\Game;

class PlayerTurn extends GameState
{
    function __construct(protected Game $game)
    {
        parent::__construct(
            $game,
            20, // ID
            StateType::ACTIVE_PLAYER, // type
            clienttranslate('${actplayer} must play a card or pass'), // description
            clienttranslate('${you} must play a card or pass') // descriptionMyTurn
        );
    }

    public function getArgs(): array
    {
        return [
            "playableCardsIds" => [1, 2],
        ];
    }

    #[PossibleAction]
    public function actPlayCard(int $card_id, int $activePlayerId, array $args)
    {
        $playableCardsIds = $args['playableCardsIds'];
        if (!in_array($card_id, $playableCardsIds)) {
            throw new \BgaUserException('Invalid card choice');
        }

        $card_name = Game::$CARD_TYPES[$card_id]['card_name'];

        $this->notify->all("cardPlayed", clienttranslate('${player_name} plays ${card_name}'), [
            "player_id" => $activePlayerId,
            "player_name" => $this->game->getPlayerNameById($activePlayerId),
            "card_name" => $card_name,
            "card_id" => $card_id,
            "i18n" => ['card_name'],
        ]);

        $this->playerScore->inc($activePlayerId, 1);

        // ВРЕМЕННО: всегда завершаем раунд для тестирования
        return 'endRound';
    }

    #[PossibleAction]
    public function actPass(int $activePlayerId)
    {
        $this->notify->all("pass", clienttranslate('${player_name} passes'), [
            "player_id" => $activePlayerId,
            "player_name" => $this->game->getPlayerNameById($activePlayerId),
        ]);

        $this->game->playerEnergy->inc($activePlayerId, 1);

        // ВРЕМЕННО: всегда завершаем раунд для тестирования
        return 'endRound';
    }

    function zombie(int $playerId)
    {
        $args = $this->getArgs();
        $zombieChoice = $this->getRandomZombieChoice($args['playableCardsIds']);
        return $this->actPlayCard($zombieChoice, $playerId, $args);
    }
}