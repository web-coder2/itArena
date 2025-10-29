<?php

$machinestates = [
    // Начальное состояние - начало игры
    1 => [
        'name' => 'gameSetup',
        'description' => '',
        'type' => 'manager',
        'action' => 'stGameSetup',
        'transitions' => [ '' => 2 ]
    ],
    
    // Состояние для начала нового раунда
    2 => [
        'name' => 'newRound',
        'description' => '',
        'type' => 'game',
        'action' => 'stNewRound', 
        'transitions' => [ '' => 3 ]
    ],
    
    // Фаза событий (первая фаза раунда)
    3 => [
        'name' => 'eventPhase',
        'description' => clienttranslate('Event phase'),
        'type' => 'game',
        'action' => 'stEventPhase',
        'transitions' => [ '' => 4 ]
    ],
    
    // Другие фазы раунда
    4 => [
        'name' => 'nextPhase',
        'description' => '',
        'type' => 'game', 
        'action' => 'stNextPhase',
        'transitions' => [ 'continue' => 5, 'endRound' => 6 ]
    ],
    
    // Проверка конца игры
    6 => [
        'name' => 'checkEndGame',
        'description' => '',
        'type' => 'game',
        'action' => 'stCheckEndGame', 
        'transitions' => [ 'nextRound' => 2, 'endGame' => 99 ]
    ],
    
    // Конец игры
    99 => [
        'name' => 'gameEnd',
        'description' => clienttranslate('End of game'),
        'type' => 'manager',
        'action' => 'stGameEnd'
    ]
];

?>