import {Component, Prop, State, Event, Host, h, EventEmitter} from '@stencil/core';
import {getUniqueKey} from "../../utils/utils";

export interface IUserInput {
  value: string;
  isValid: boolean;
}

@Component({
  tag: 'stencil-input',
  styleUrl: 'stencil-input.css',
  shadow: true,
})
export class StencilInput {
  defaultValidationScheme = {
    url: {
      pattern: '^(ftp|http|https):\/\/[^ "]+$',
      errorMessage: 'Fill in a valid URL',
      validMessage: 'Valid URL'
    }
  };

  @Prop() size?: "small" | "medium" | "large" | "full" = "small";
  @Prop() type?: string = "text";
  @Prop() placeholder?: string;
  @Prop() validationPattern?: string;
  @Prop() label?: string;
  @Prop() inputId?: string;

  @State() isValid: boolean = true;
  @State() isTouched: boolean = false;
  @State() patternRegExp: RegExp | null = null;

  @Event() userInput: EventEmitter<IUserInput>;

  componentWillLoad(){
    this.patternRegExp = this.validationPattern ? new RegExp(this.validationPattern) :
      this.defaultValidationScheme[this.type] ?
        new RegExp(this.defaultValidationScheme[this.type].pattern) : null;
  }

  private handleBlur = () => {this.isTouched = true;};

  private inputTyped = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    this.isValid = this.patternRegExp ? this.patternRegExp.test(value) : true;
    this.userInput.emit({value, isValid: this.isValid});
  }

  render() {
    const inputId = this.inputId ? this.inputId : getUniqueKey("input");
    const inputErrorClassName = !this.isTouched ? "input" :
      this.isValid ? "input input_valid" : "input input_error";
    const inputClassName = this.size ? `${inputErrorClassName} input_${this.size}` : inputErrorClassName;
    const validationStatusClassName =
      !this.isTouched ? "validation-status" :
        this.isValid ? "validation-status validation-status_valid" : "validation-status validation-status_error";
    return (
      <Host>
        {this.label ? (
          <label htmlFor={inputId} class="label">{this.label}</label>
        ) : null}
        <input id={inputId} class={inputClassName} type={this.type} onInput={this.inputTyped} onBlur={this.handleBlur}
               placeholder={this.placeholder}/>
        <div class={validationStatusClassName}>
          {!this.isTouched ? "" :
            this.isValid ? this.defaultValidationScheme[this.type].validMessage
              : this.defaultValidationScheme[this.type].errorMessage}
        </div>
      </Host>
    );
  }

}
