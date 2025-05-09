import clsx from 'clsx';
import styles from './app.module.scss';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader } from '../app-header';
import { HeroPage, Login, NotFound404, Profile, Register } from '../../pages';
import ProtectedRoute from '../protected-route/protected-route';
import { Modal } from '../modal';
import { OrdersHistory, ProfileInfo } from '../../pages/profile/profile';
import { FormInput } from '../ui/form-input-prompt';

export const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.background;

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <div className={clsx(styles.app)}>
      <AppHeader />

      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<HeroPage />} />

        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}>
          <Route index element={<ProfileInfo />} />
          <Route path='orders' element={<OrdersHistory />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/modal'
            element={
              <Modal title='Введите ваш запрос максимально подробно' onClose={closeModal}>
                <FormInput></FormInput>
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};
