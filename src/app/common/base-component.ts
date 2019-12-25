import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
export declare class BaseComponent implements OnDestroy {
    componentDestroyed$: Subject<boolean>;
    ngOnDestroy(): void;
}
