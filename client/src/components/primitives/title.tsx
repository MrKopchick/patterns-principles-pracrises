import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { useComponentVisible } from '../../hooks/useComponentVisible';
import { BasicTitle } from './styled/basic-title';
import { TitleContainer } from './styled/title-container';
import { TitleInput } from './styled/title-input';

type Props = {
  fontSize: 'x-large' | 'large' | 'medium';
  isBold?: boolean;
  title: string;
  width?: number;
  onChange: (value: string) => void;
};

export const Title = ({ onChange, title, fontSize, isBold, width }: Props) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const [value, setValue] = useState(title);

  useEffect(() => setValue(title), [title]);

  const onEdit = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    onChange(value);
    setIsComponentVisible(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onChange(value);
      setIsComponentVisible(false);
    }
  };

  return (
    <TitleContainer className="title-container" ref={ref}>
      {isComponentVisible ? (
        <TitleInput
          className="title-input"
          value={value}
          onChange={onEdit}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          fontSize={fontSize}
          isBold={isBold}
          autoFocus
          width={width ?? 250}
        />
      ) : (
        <BasicTitle
          className="title-content"
          onClick={() => setIsComponentVisible(true)}
        >
          {value}
        </BasicTitle>
      )}
    </TitleContainer>
  );
};
