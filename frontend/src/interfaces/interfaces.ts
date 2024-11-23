export interface regularResponse {
    success: boolean;
    message: string;
    error: any
}

export interface getAllNotesResp {
    success: boolean,
    message: string,
    notes: []
}

export interface notesArray {
    notes: [
        {
            note: string;
            _id: string
        }
    ]
}