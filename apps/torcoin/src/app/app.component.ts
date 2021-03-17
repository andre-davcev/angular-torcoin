import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StateAuth } from '@atd/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'atd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  @Select(StateAuth.authenticated) authenticated$: Observable<boolean>;

  private title = 'torqoin';
}
