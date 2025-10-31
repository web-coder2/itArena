/**
 *------
 * BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
 * itaren implementation : © <Your name here> <Your email address here>
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 *
 * itaren.js
 *
 * itaren user interface script
 *
 * In this file, you are describing the logic of your user interface, in Javascript language.
 *
 */

define(['dojo', 'dojo/_base/declare', 'ebg/core/gamegui', 'ebg/counter', getLibUrl('bga-animations', '1.x'),], function (dojo, declare, gamegui, counter, BgaAnimations) {
  return declare('bgagame.itaren', ebg.core.gamegui, {
    constructor: function () {
      console.log('itaren constructor')

      // Here, you can init the global variables of your user interface
      // Example:
      // this.myGlobalValue = 0;
    },

    /*
            setup:
            
            This method must set up the game user interface according to current game situation specified
            in parameters.
            
            The method is called each time the game interface is displayed to a player, ie:
            _ when the game starts
            _ when a player refreshes the game page (F5)
            
            "gamedatas" argument contains all datas retrieved by your "getAllDatas" PHP method.
        */

    setup: function (gamedatas) {
      console.log('Starting game setup')
      //Мой код для отображения названия эпохи
      // Получаем текущий раунд из данных игры
      const currentRound = gamedatas.current_round || 1
      const roundName = gamedatas.round_names && gamedatas.round_names[currentRound] ? gamedatas.round_names[currentRound] : 'Рождение идеи'
        
      let currentRoundMarginLeft = ( 1 / 12 ) + (currentRound * 100 / 6)

      // create the animation manager, and bind it to the `game.bgaAnimationsActive()` function
      this.animationManager = new BgaAnimations.Manager({
        animationsActive: () => this.bgaAnimationsActive(),
    });

    //   this.addHeaderText('Раунд: ' + currentRound + ' - ' + roundName, 'round_counter')
      //Конец моего кода
      // Example to add a div on the game area
      // this.getGameAreaElement().insertAdjacentHTML('beforeend', `
      //     <div id="player-tables"></div>
      // `);

      this.getGameAreaElement().insertAdjacentHTML(
        'beforeend',
        `   
            <div class="allSection-header"></div>
            <div class="allSection">
                <div class="allPlanshet"></div>
                <div class="cards-container">
                    <div class="card"></div>
                    <div class="card"></div>
                    <div class="card"></div>
                </div>
                <div class="menu">
                    <h1>Айти арена</h1>
                    <!-- <img class="paei" src="https://studio.boardgamearena.com:8084/data/themereleases/current/games/itaren/999999-9999/img/dice.png"> -->
                    <div class="paei">
                        <h2>PAEI</h2>
                    </div>
                </div>
            </div>
            `
      )

    // TODO: подумать стоит и если да то как и где сделать маркер раунда (круг напротив номера рануда в плашенетеше)

    // let allPlanshetElement = this.getGameAreaElement().querySelector('.allPlanshet')

    // allPlanshetElement.innerHTML = "<div class='roundPoint'></div>"
    
    // this.getGameAreaElement().querySelector('.roundPoint').style.marginLeft = currentRoundMarginLeft + 'px'

    // const allSectionHeader = this.getGameAreaElement().querySelector('.allSection-header');
    // allSectionHeader.innerHTML = '<h2>Раунд: ' + currentRound + ' - ' + roundName + '</h2>'

      // Object.values(gamedatas.players).forEach(player => {
      //     this.getPlayerPanelElement(player.id).insertAdjacentHTML('beforeend', `
      //         <span id="energy-player-counter-${player.id}"></span> Energy
      //     `);
      //     const counter = new ebg.counter();
      //     counter.create(`energy-player-counter-${player.id}`, { value: player.energy, playerCounter: 'energy', playerId: player.id });

      //     document.getElementById('player-tables').insertAdjacentHTML('beforeend', `
      //         <div id="player-table-${player.id}">
      //             <strong>${player.name}</strong>
      //             <div>Player zone content goes here</div>
      //         </div>
      //     `);
      // });

      // this.getGameAreaElement().insertAdjacentHTML('beforeend', `
      //     <div class="allSection">
      //         <div class="allPlanshet"></div>
      //         <div class="cards-container">
      //             <div class="card"></div>
      //             <div class="card"></div>
      //             <div class="card"></div>
      //         </div>
      //         <div class="menu"></div>
      //     </div>
      // `)

      this.getGameAreaElement().insertAdjacentHTML(
        'beforeend',
        `
                <div class="second-section">
                    <div class="projectsIT"></div>
                    <!-- <div class="pamyatka"></div> -->
                </div>
            `
      )

      this.getGameAreaElement().insertAdjacentHTML(
        'beforeend',
        `
                <div class="player-zone">
                    <div class="player-field"></div>
                    <div class="player-cards">
                    <div class="cards-header bg-green-header">
                        <p>продажа</p>
                    </div>
                        <div class="cards-zone bg-green">
                            <div class="card2 shadow-green"></div>
                            <div class="card2 shadow-green"></div>
                            <div class="card2 shadow-green"></div>
                        </div>
                    <div class="cards-header bg-red-header">
                        <p>бэк офис</p>
                    </div>
                        <div class="cards-zone bg-red">
                            <div class="card2 shadow-red"></div>
                        </div>
                    <div class="cards-header bg-blue-header">    
                        <p>технари</p>
                    </div>
                        <div class="cards-zone bg-blue">
                            <div class="card2 shadow-blue"></div>
                            <div class="card2 shadow-blue"></div>
                        </div>
                    </div>
                </div>
            `
      )

      // TODO: Set up your game interface here, according to "gamedatas"

      // Setup game notifications to handle (see "setupNotifications" method below)
      this.setupNotifications()

      console.log('Ending game setup')
    },

    ///////////////////////////////////////////////////
    //// Game & client states

    // onEnteringState: this method is called each time we are entering into a new game state.
    //                  You can use this method to perform some user interface changes at this moment.
    //
    onEnteringState: function (stateName, args) {
      console.log('Entering state: ' + stateName, args)

      switch (stateName) {
        /* Example:
            
            case 'myGameState':
            
                // Show some HTML block at this game state
                dojo.style( 'my_html_block_id', 'display', 'block' );
                
                break;
           */

        case 'dummy':
          break
      }
    },

    // onLeavingState: this method is called each time we are leaving a game state.
    //                 You can use this method to perform some user interface changes at this moment.
    //
    onLeavingState: function (stateName) {
      console.log('Leaving state: ' + stateName)

      switch (stateName) {
        /* Example:
            
            case 'myGameState':
            
                // Hide the HTML block we are displaying only during this game state
                dojo.style( 'my_html_block_id', 'display', 'none' );
                
                break;
           */

        case 'dummy':
          break
      }
    },

    // onUpdateActionButtons: in this method you can manage "action buttons" that are displayed in the
    //                        action status bar (ie: the HTML links in the status bar).
    //
    onUpdateActionButtons: function (stateName, args) {
      console.log('onUpdateActionButtons: ' + stateName, args)

      if (this.isCurrentPlayerActive()) {
        switch (stateName) {
          case 'PlayerTurn':
            const playableCardsIds = args.playableCardsIds // returned by the argPlayerTurn

            // Add test action buttons in the action status bar, simulating a card click:
            playableCardsIds.forEach((cardId) => this.statusBar.addActionButton(_('Play card with id ${card_id}').replace('${card_id}', cardId), () => this.onCardClick(cardId)))

            this.statusBar.addActionButton(_('Pass'), () => this.bgaPerformAction('actPass'), { color: 'secondary' })
            break
        }
      }
    },

    ///////////////////////////////////////////////////
    //// Utility methods

    /*
        
            Here, you can defines some utility methods that you can use everywhere in your javascript
            script.
        
        */

    //TODO Свят это мой код
    // Добавляет текст в заголовок
    addHeaderText: function (text, id) {
      // const headerElement = document.getElementById('game_play_area_wrap')
      const headerElement = document.getElementById('allSection-header')
      if (headerElement && !document.getElementById(id)) {
        const roundCounter = document.createElement('div')
        roundCounter.id = id
        roundCounter.className = 'round-counter'
        roundCounter.style.cssText = 'position: absolute; top: 10px; left: 10px; background: white; padding: 5px 10px; border-radius: 5px; font-weight: bold; z-index: 1000;'
        roundCounter.innerHTML = text
        headerElement.appendChild(roundCounter)
      }
    },

    // Обновляет текст в заголовке
    updateHeaderText: function (id, text) {
      const element = document.getElementById(id)
      if (element) {
        element.innerHTML = text
      }
    },

    // Обновляет отображение раунда
    updateRound: function (round, roundName) {
      this.updateHeaderText('round_counter', 'Раунд: ' + round + ' - ' + roundName)
    },

    ///////////////////////////////////////////////////
    //// Player's action

    /*
        
            Here, you are defining methods to handle player's action (ex: results of mouse click on 
            game objects).
            
            Most of the time, these methods:
            _ check the action is possible at this game state.
            _ make a call to the game server
        
        */

    // Example:

    onCardClick: function (card_id) {
      console.log('onCardClick', card_id)

      this.bgaPerformAction('actPlayCard', {
        card_id,
      }).then(() => {
        // What to do after the server call if it succeeded
        // (most of the time, nothing, as the game will react to notifs / change of state instead)
      })
    },

    ///////////////////////////////////////////////////
    //// Reaction to cometD notifications

    /*
            setupNotifications:
            
            In this method, you associate each of your game notifications with your local method to handle it.
            
            Note: game notification names correspond to "notifyAllPlayers" and "notifyPlayer" calls in
                  your itaren.game.php file.
        
        */
    setupNotifications: function () {
      console.log('notifications subscriptions setup')

      // automatically listen to the notifications, based on the `notif_xxx` function on this class.
      this.bgaSetupPromiseNotifications()
    },

    // TODO: from this point and below, you can write your game notifications handling methods

    /*
        Example:
        
        notif_cardPlayed: async function( args )
        {
            console.log( 'notif_cardPlayed' );
            console.log( args );
            
            // Note: args contains the arguments specified during you "notifyAllPlayers" / "notifyPlayer" PHP call
            
            // TODO: play the card in the user interface.
        },    
        
        */
    // Обработчик уведомления о новом раунде
    notif_newRound: function (notif) {
      console.log('notif_newRound', notif)
      this.updateRound(notif.args.round, notif.args.round_name)
    },
  })
})
