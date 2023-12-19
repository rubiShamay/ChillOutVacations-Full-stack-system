import VacationModal from "../Models/VacationModel";
import { createStore } from "redux"

export class VacationsState {
    public vacations: VacationModal[] = []
}

export enum VacationActionType {
    SetVacation = "SetVacation",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation",
    GetOneVacation = "GetOneVacation",
    AddFollower = "AddFollower",
    RemoveFollower = "RemoveFollower",
    ClearAll = "ClearAll"
}

export interface VacationsAction {
    type: VacationActionType,
    payload?: any
}

function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {
    const newState = { ...currentState };
    switch (action.type) {
        case VacationActionType.SetVacation:
            newState.vacations = action.payload;
            break;
        case VacationActionType.AddVacation:
            newState.vacations.push(action.payload);
            break;
        case VacationActionType.UpdateVacation:
            const indexToUpdate = newState.vacations.findIndex(v => v.id === action.payload.id);
            newState.vacations[indexToUpdate] = action.payload;
            break;
        case VacationActionType.DeleteVacation:
            const indexToDelete = newState.vacations.findIndex(v => v.id === action.payload)
            newState.vacations.slice(indexToDelete, 1)
            break;
        case VacationActionType.GetOneVacation:
            const indexToGetOne = newState.vacations.findIndex(v => v.id === action.payload)
            newState.vacations.slice(indexToGetOne, 1)
            break;
        case VacationActionType.AddFollower:
            const indexToAddFollower = newState.vacations.findIndex(v => v.id === action.payload.vacationId)
            ++newState.vacations[indexToAddFollower].followersCount
            newState.vacations[indexToAddFollower].isFollowing = 1
            break;
        case VacationActionType.RemoveFollower:
            const indexToRemoveFollower = newState.vacations.findIndex(v => v.id === action.payload)
            --newState.vacations[indexToRemoveFollower].followersCount
            newState.vacations[indexToRemoveFollower].isFollowing = 0
            break;
        case VacationActionType.ClearAll:
            newState.vacations = []
            break;
    }

    return newState
}

export const vacationsStore = createStore(vacationsReducer)