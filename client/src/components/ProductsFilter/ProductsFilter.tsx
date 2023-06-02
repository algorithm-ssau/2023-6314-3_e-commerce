import styles from './ProductsFilter.module.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { IconFilter } from '../IconFilter';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
} from '@mui/material';
import { CustomContainer, CustomTextField } from './styles';

export const ProductsFilter = () => {
  const matches = useMediaQuery('(max-width:980px)');
  return (
    <Container sx={{ width: matches ? '100%' : '30%', marginTop: '.45em' }}>
      <Accordion>
        {matches && (
          <AccordionSummary expandIcon={<IconFilter />}>
            <Typography>Фильтр</Typography>
          </AccordionSummary>
        )}
        <AccordionDetails>
          <CustomContainer>
            <Typography variant="h6" mb="0" sx={{ fontSize: '1rem' }}>
              Категория
            </Typography>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={<Typography variant="body2">Серьги</Typography>}
              sx={{ marginLeft: '.75em' }}
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={<Typography variant="body2">Колье</Typography>}
              sx={{ marginLeft: '.75em' }}
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={<Typography variant="body2">Браслеты</Typography>}
              sx={{ marginLeft: '.75em' }}
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={<Typography variant="body2">Кольца</Typography>}
              sx={{ marginLeft: '.75em' }}
            />
          </CustomContainer>
          <Container>
            <Typography variant="h6" sx={{ fontSize: '1rem' }}>
              Цена, руб.
            </Typography>
            <FormControl>
              <CustomTextField
                size="small"
                type="number"
                placeholder="От"
                sx={{ padding: '.15em' }}
              ></CustomTextField>
            </FormControl>
            <span className={styles.line}></span>
            <FormControl>
              <CustomTextField
                size="small"
                type="number"
                placeholder="До"
                sx={{ padding: '.15em' }}
              ></CustomTextField>
            </FormControl>
          </Container>
          <CustomContainer>
            <Typography
              variant="h6"
              mb="0"
              mt=".25em"
              sx={{ fontSize: '1rem' }}
            >
              Материал
            </Typography>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={<Typography variant="body2">Серебро</Typography>}
              sx={{ marginLeft: '.75em' }}
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={
                <Typography variant="body2">Родированное серебро</Typography>
              }
              sx={{ marginLeft: '2em' }}
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={<Typography variant="body2">Золоченое серебро</Typography>}
              sx={{ marginLeft: '2em' }}
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={<Typography variant="body2">Золото</Typography>}
              sx={{ marginLeft: '.75em' }}
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={<Typography variant="body2">Жёлтое золото</Typography>}
              sx={{ marginLeft: '2em' }}
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={<Typography variant="body2">Белое золото</Typography>}
              sx={{ marginLeft: '2em' }}
            />
          </CustomContainer>
          <Container>
            <Typography variant="h6" mb="0" sx={{ fontSize: '1rem' }}>
              Категория
            </Typography>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={<Typography variant="body2">375</Typography>}
              sx={{ marginLeft: '.75em' }}
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={<Typography variant="body2">585</Typography>}
              sx={{ marginLeft: '.75em' }}
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={<Typography variant="body2">750</Typography>}
              sx={{ marginLeft: '.75em' }}
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={<Typography variant="body2">985</Typography>}
              sx={{ marginLeft: '.75em' }}
            />
          </Container>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};
