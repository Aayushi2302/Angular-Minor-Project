import { Injectable, inject } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
    providedIn: "root"
})
export class CustomMessageService {

    messageService = inject(MessageService);

    displayToast(customSeverity: string, customSummary: string, customDetail: string){
        this.messageService.add({
            severity: customSeverity,
            summary: customSummary,
            detail: customDetail
        })
    }
}