import {Injectable} from "@angular/core";
import {CharacterMovement} from "../classes/character.movement";

@Injectable()
export class CharacterMovementService {
	characterMovement: CharacterMovement = {
        up: function() {
        },
        down: function() {
        },
        left: function() {
        }, 
        right: function() {
        }
    };
}