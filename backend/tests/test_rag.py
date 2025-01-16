import pytest
import unittest.mock as mock
from source.rag import RagPdf
from io import BytesIO

class TestRagPdf:
    
    def test_load_file(self):
        rag = RagPdf()
        assert rag.load_file(BytesIO(b'This is a sample pdf file.')) == "This is a sample pdf file."