<?php
declare(strict_types=1);

namespace Bga\Games\itaren\States;

class TestState extends \Bga\GameFramework\States\GameState 
{
    function __construct($game) {
        parent::__construct($game, id: 50, type: \Bga\GameFramework\StateType::GAME);
    }
}