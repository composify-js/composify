import { ClassNames } from '../Constants';

export const EditorStyle = () => (
  <style>
    {`
      .${ClassNames.Editor} {
        display: flex;
        min-height: 100vh;
        background-color: #F5F5F5;
      }

      .${ClassNames.Library} {
        display: flex;
        flex-direction: column;
        max-width: 296px;
        width: 100%;
        border-right: 1px solid #E0E0E0;
        background-color: #FFFFFF;
      }

      .${ClassNames.SearchForm} {
        font-size: 1rem;
        padding: 1rem;
        outline: none;
        border: none;
        border-bottom: 1px solid #E0E0E0;
        background-color: #FFFFFF;
      }

      .${ClassNames.SpecList} {
        display: flex;
        flex-direction: column;
        padding: 1rem;
      }

      .${ClassNames.SpecItem} {
        margin: 0;
        padding: 0.5rem;
        font-size: 0.875rem;
        border-radius: 0.25rem;
        overflow: hidden;
      }

      .${ClassNames.Canvas} {
        flex: 1;
        margin: 1rem;
        border: 1px solid #E0E0E0;
        background-color: #FFFFFF;
      }
    `}
  </style>
);
