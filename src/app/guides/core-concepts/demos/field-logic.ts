import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { disabled, FormField, form, required, schema } from '@angular/forms/signals';
import { FormInspectorComponent } from '../../../ui/form-inspector.ts/form-inspector';
import { DemoLayout } from '../../../ui/demo-layout/demo-layout';

interface MyDataModel {
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'field-logic',
  templateUrl: './field-logic.html',
  imports: [FormField, FormInspectorComponent, DemoLayout],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldLogic {
  protected readonly myForm = form(
    signal<MyDataModel>({
      firstName: 'Delete me',
      lastName: 'Disabled',
    }),
    schema<MyDataModel>((schemaPath) => {
      required(schemaPath.firstName);
      disabled(schemaPath.lastName, 'Last name cannot be changed');
    }),
  );
}
