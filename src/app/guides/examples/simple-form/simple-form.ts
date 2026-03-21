import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { email, FormField, form, required, schema, submit } from '@angular/forms/signals';
import { catchError, delay, firstValueFrom, map, of } from 'rxjs';
import { FormInspectorComponent } from '../../../ui/form-inspector.ts/form-inspector';
import { DemoLayout } from '../../../ui/demo-layout/demo-layout';
import { FieldErrors } from '../../../ui/field-errors';

interface LoginForm {
  email: string;
  password: string;
}

@Component({
  selector: 'simple-form',
  standalone: true,
  templateUrl: './simple-form.html',
  imports: [FormField, FormInspectorComponent, DemoLayout, FieldErrors],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleForm {
  protected readonly loginForm = form(
    signal<LoginForm>({ email: '', password: '' }),
    schema<LoginForm>((schemaPath) => {
      required(schemaPath.email, { message: 'Email is required' });
      required(schemaPath.password, { message: 'Password is required' });
      email(schemaPath.email, { message: 'Invalid email format' });
    }),
  );

  protected async submitForm(event: Event): Promise<void> {
    event.preventDefault();

    await submit(this.loginForm, async (form) => {
      return await firstValueFrom(
        of(form().value()).pipe(
          delay(4000),
          map(() => {
            return null;
          }),
          catchError(() =>
            of({
              kind: 'server',
              message: 'An unexpected error occurred, please try again.',
            }),
          ),
        ),
      );
    });
  }
}
