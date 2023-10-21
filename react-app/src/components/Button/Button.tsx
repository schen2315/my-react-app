import styled from "styled-components";

interface ButtonProps {
  children: string;
  //type?: "primary" | "secondary" | "danger";
}

const StyledButton = styled.button<ButtonProps>`
  padding: 5px 12px;
  border-radius: 3px;
  border: 0;
  background: #0d6efd;
  color: white;
`;

const Button = ({ children }: ButtonProps) => {
  return (
    <div>
      <StyledButton>{children}</StyledButton>
    </div>
  );
};

export default Button;
