import PropTypes from 'prop-types';
import { Section, StyledForm, Label, Input, Title } from './styled';
import { useDispatch } from 'react-redux';
import { setFilter } from 'redux/filterSlice';

export const FilterForm = ({ label }) => {
  const dispatch = useDispatch()

  const handleChange = ({target : {value}}) => {
    dispatch(setFilter(value))
  }
  return (
    <Section>
      <Title>Contacts</Title>
      <StyledForm>
        <Label htmlFor="filter">{label}</Label>
        <Input
          type="text"
          id="filter"
          name="filter"
          onChange={handleChange}
        />
      </StyledForm>
    </Section>
  );
};

FilterForm.propTypes = {
  label: PropTypes.string.isRequired,
};