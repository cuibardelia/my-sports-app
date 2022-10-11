import { useFormContext } from 'react-hook-form';


type InputTypes =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'color'
  | 'date';

export const Input = ({
  name,
  labelText,
  type = 'text',
}: {
  name: string;
  labelText: string;
  type: InputTypes;
}) => {
  const {
    formState: { errors },
    register,
  } = useFormContext();

  //TODO: remove tw

  return (
      <div>
        <label className="text-sm" htmlFor={name}>
          {labelText}
        </label>
        <input
          type={type}
          id={name}
          {...register(name)}
        />
        {errors?.[name] && (
          <span>
            {/*{errors[name]?.message}*/}
            {'FIXME'}
          </span>
        )}
      </div>
  );
}
