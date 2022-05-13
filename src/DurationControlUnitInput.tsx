import * as React from "react";

/**
 * The duration unit types.
 */
export type DurationUnitType = "day" | "hour" | "minute" | "second" | "millisecond";

/**
 * The DurationControlUnitInput component props.
 */
export type DurationControlUnitInputProps = {
    /** The unit type. */
    type: DurationUnitType;

    /** The character length of the unit input. */
    characterLength: number;

    value: number | null;

	onChange: (value: number | null) => void;
};

/**
 * The DurationControlUnitInput component.
 */
export const DurationControlUnitInput: React.FunctionComponent<DurationControlUnitInputProps> = ({ value, onChange, type, characterLength }) => {
    const [focused, setFocused] = React.useState(false);

    const getValue = (): string | number => {
        // If our value is null then the input should just be empty.
        if (value === null) {
            return "";
        }

        // If our field is focused then we want to show the raw value. If it isn't then we want our padded value.
        return focused ? value : String(value).padStart(characterLength, "0");
    }

    return (
        <div className={`duration-control-unit-input-wrapper ${type}`}>
            <input
                type="text"
                value={getValue()}
                onChange={(event) => {
                    // If our input is empty then the input value should be null.
                    if (!event.target.value) {
                        onChange(null);
                        return;
                    }

                    // Only call our 'onChange' callback if our value is actually a valid number.
                    if (!Number.isNaN(Number(event.target.value))) {
                        onChange(parseInt(event.target.value, 10));
                    }
                }}
                onBlur={(event) => {
                    setFocused(false);

                    // If focus leaves our input and it is empty then we should reset the input value to zero.
                    if (!event.target.value) {
                        onChange(0);
                    }
                }}
                onFocus={() => {
                    setFocused(true);
                }}
                className={`duration-control-unit-input ${type}`} 
                maxLength={characterLength}
                size={characterLength}>
            </input>
        </div>
    );
};