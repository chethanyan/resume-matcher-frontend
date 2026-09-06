import { SplitLayout } from './components/layout/SplitLayout';
import { ResumePanel } from './components/resume/ResumePanel';
import { RightPanel } from './components/layout/RightPanel';

function App() {
  return (
    <SplitLayout
      left={<ResumePanel />}
      right={<RightPanel />}
    />
  );
}

export default App;